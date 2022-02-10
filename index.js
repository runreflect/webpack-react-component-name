const walk = require("acorn-walk")
const ModuleAppenderDependency = require('./lib/module-appender')
const OptionsParser = require('./lib/options-parser')

// Keep track of the nodes we update so we don't make duplicate updates
const updatedNodes = new Set()

const VALID_FILE_SUFFIXES_REGEX = /\.(js|jsx|ts|tsx)$/

// Normally React component names are minified during compilation.  This plugin
// makes these component names available in production bundles by hooking into
// Webpack's compilation process, traversing the AST looking for React component
// definitions, and updating the emitted source code to populate the
// displayName property.  This is the property that, when populated, is used by the React Dev
// Tools extension to determine the name of a component.
//
// For more information on the AST format and API, see:
// https://github.com/estree/estree
// https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
class WebpackReactComponentNamePlugin {
  constructor(options) {
    this.options = new OptionsParser().parse(options)
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(
      "WebpackReactComponentNamePlugin",
      (compilation, { contextModuleFactory, normalModuleFactory }) => {
        compilation.dependencyTemplates.set(
          ModuleAppenderDependency,
          new ModuleAppenderDependency.Template()
        )
      }
    )

    compiler.hooks.normalModuleFactory.tap('WebpackReactComponentNamePlugin', factory => {
      factory.hooks.parser.for('javascript/auto').tap('WebpackReactComponentNamePlugin', parser => {
        parser.hooks.program.tap("WebpackReactComponentNamePlugin", ast => {
          // Ignore dependency files
          if (parser.state.current.resource == null 
            || (!this.options.parseDependencies && parser.state.current.resource.indexOf("node_modules") !== -1) 
            || !VALID_FILE_SUFFIXES_REGEX.test(parser.state.current.resource.toLowerCase())) {
            return
          }

          walk.ancestor(ast, {
            VariableDeclarator(node) {
              // Matches: const Foo extends React._ or import _ from React; const Foo extends _
              if (
                node &&
                node.id &&
                node.id.type === 'Identifier' &&
                node.init && node.init.callee &&
                node.init.callee.type === 'FunctionExpression' &&
                node.init.callee.params &&
                node.init.callee.params.length > 0 &&
                node.init.callee.params[0].type === 'Identifier' && ['_React$Component', '_Component', '_React$PureComponent', '_PureComponent'].includes(node.init.callee.params[0].name)
              ) {
                addDisplayName(parser, node)
              }
            },

            CallExpression(node, state, ancestors) {
              // Matches: const Foo = React.forwardRef((props, ref) => { .. }
              if (
                node &&
                node.callee &&
                ((
                  node.callee.type === 'MemberExpression' &&
                  node.callee.object.name === 'React' &&
                  node.callee.property.name === 'forwardRef'
                ) ||
                (
                  state.forwardRefFunctionImported
                  && node.callee.type === 'Identifier'
                  && node.callee.name ==='forwardRef'
                ))
              ) {
                const variableDeclarator = ancestors.find(ancestor => ancestor.type === 'VariableDeclarator')

                if (variableDeclarator) {
                  addDisplayName(parser, variableDeclarator)
                }
              }
              // Matches when function returns JSX/React.createElement()
              else if (
                node &&
                node.callee &&
                ((
                  node.callee.type === 'MemberExpression' &&
                  node.callee.object &&
                  node.callee.object.name === 'React' &&
                  node.callee.property &&
                  ['createElement', 'memo'].includes(node.callee.property.name)
                ) ||
                (
                  state.memoFunctionImported
                  && node.callee.type === 'Identifier'
                  && node.callee.name ==='memo'
                ))
                && ancestors
                && ancestors.length > 1
              ) {
                const parentAncestor = ancestors[ancestors.length - 2]

                if (parentAncestor && ['ReturnStatement', 'ArrowFunctionExpression'].includes(parentAncestor.type)) {
                  // ArrowFunctionExpression is present when no Babel plugins are used when transforming JSX

                  const variableDeclaratorIdx = ancestors.findIndex(ancestor => ancestor.type === 'VariableDeclarator')

                  if (variableDeclaratorIdx != -1) {
                    const variableDeclarator = ancestors[variableDeclaratorIdx]
                    addDisplayName(parser, variableDeclarator)
                  }
                } else if (parentAncestor && parentAncestor.type === 'VariableDeclarator') {
                  addDisplayName(parser, parentAncestor)
                }
              }
            },

            FunctionDeclaration(node) {
              // Matches: export default function Foo() with returning statement
              if (node && node.id && node.id.type === 'Identifier' && node.body && node.body.body && node.body.body.filter(thing => thing.type === 'ReturnStatement')) {
                const returnStatements = node.body.body.filter(thing => thing.type === 'ReturnStatement')

                if (returnStatements.length > 0) {
                  const returnStatement = returnStatements[0]
                  if (
                    returnStatement &&
                    returnStatement.argument &&
                    returnStatement.argument.callee &&
                    (
                      // with returning statement calling React.createElement
                      argumentCreatesElement(returnStatement.argument.callee) ||

                      // with returning statement calling _jsxs (or) _jsx (as in Next.js)
                      argumentJsx(returnStatement.argument.callee)
                    )
                  ) {
                    addDisplayName(parser, node)
                  } else if ( // @emotion/babel-preset-css-prop replacing React.createElement with React.Fragment
                    returnStatement &&
                    returnStatement.argument && 
                    returnStatement.argument.callee &&
                    returnStatement.argument.callee.name === '___EmotionJSX' &&
                    returnStatement.argument.arguments &&
                    returnStatement.argument.arguments.length > 0
                  ) {
                    addDisplayName(parser, node)
                  }
                }
              }
            },

            ClassDeclaration(node) {
              // Matches: export default class Foo extends _
              if (
                node &&
                node.id &&
                node.id.type === 'Identifier' &&
                node.superClass &&
                (
                  (
                    node.superClass.object &&
                    node.superClass.object.type === 'Identifier' &&
                    node.superClass.object.name === 'React' &&
                    node.superClass.property &&
                    node.superClass.property.type === 'Identifier' &&
                    ['Component', 'PureComponent'].includes(node.superClass.property.name)
                  ) ||
                  (
                    node.superClass.type === 'Identifier' &&
                    ['Component', 'PureComponent'].includes(node.superClass.name)
                  )
                )
              ) {
                addDisplayName(parser, node)
              }
            },

            ImportDeclaration(node, state) {
              // Matches: import { memo, forwardRef } from 'react'
              if (
                  node
                  && node.source
                  && node.source.value === 'react'
                  && node.specifiers
                  && node.specifiers.length > 0
              ) {
               
                state.memoFunctionImported = state.memoFunctionImported || node.specifiers.some(s => s.type === 'ImportSpecifier' && s.imported.name === 'memo' )
                state.forwardRefFunctionImported = state.forwardRefFunctionImported || node.specifiers.some(s => s.type === 'ImportSpecifier' && s.imported.name === 'forwardRef' )
              }
            }
          },
          {
            ...walk.base,
            // Add any objects that acorn-walk doesn't handle by default and thus would throw a ModuleParseError otherwise
            Import: () => {}
          }, {})
        })
      })
    })
  }
}

function argumentCreatesElement(argument) {
  return argument && 
    argument.type === 'MemberExpression' &&
    argument.object &&
    (argument.name === 'React' || argument.object.name === 'React') &&
    argument.property &&
    argument.property.name === 'createElement'
}

function argumentJsx(argument) {
  return argument &&
    argument.type === "Identifier" &&
    ["_jsxs", "_jsx"].includes(argument.name)
}

function addDisplayName(parser, node) {
  if (updatedNodes.has(node)) {
    return // Already added propertyName for this node
  }

  const componentName = node.id.name

  if (componentName[0] == componentName[0].toLowerCase()) {
    return // Assume lowercase names are helper functions and not Component classes
  }

  const dep = new ModuleAppenderDependency(`;try{${componentName}.displayName="${componentName}";}catch(e){}`, node.range)
  dep.loc = node.loc
  parser.state.current.addDependency(dep)

  updatedNodes.add(node)
}

module.exports = WebpackReactComponentNamePlugin
