const walk = require("acorn-walk")
const ModuleAppenderDependency = require('./lib/module-appender')

// Keep track of the nodes we update so we don't make duplicate updates
const updatedNodes = new Set()

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
    this.options = options
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
          if (parser.state.current.resource == null || parser.state.current.resource.indexOf("node_modules") !== -1) {
            return
          }

          walk.ancestor(ast, {
            VariableDeclarator(node) {
              // Matches: const Foo extends React._ or import _ from React; const Foo extends _
              if (
                node.id &&
                node.id.type === 'Identifier' &&
                node.init && node.init.callee && 
                node.init.callee.type === 'FunctionExpression' &&
                node.init.callee.params && node.init.callee.params.length > 0 &&
                node.init.callee.params[0].type === 'Identifier' && ['_React$Component', '_Component', '_React$PureComponent', '_PureComponent'].includes(node.init.callee.params[0].name)
              ) {
                addDisplayName(parser, node, true)
              }
            },

            CallExpression(node, ancestors) {
              // Matches: const Foo = React.forwardRef((props, ref) => { .. }
              if (node.callee.type == 'MemberExpression' && node.callee.object.name === 'React' && node.callee.property.name === 'forwardRef') {
                const variableDeclarator = ancestors.find(ancestor => ancestor.type === 'VariableDeclarator')

                if (variableDeclarator) {
                  addDisplayName(parser, variableDeclarator, true)
                }
              }
              // Matches when function returns JSX/React.createElement()
              else if (
                node.callee &&
                node.callee.type === 'MemberExpression' &&
                node.callee.object &&
                node.callee.object.name === 'React' &&
                node.callee.property &&
                node.callee.property.name === 'createElement'
                && ancestors
                && ancestors.length > 1
              ) {
                const parentAncestor = ancestors[ancestors.length - 2]

                if (parentAncestor.type === 'ReturnStatement') {
                
                  const variableDeclaratorIdx = ancestors.findIndex(ancestor => ancestor.type === 'VariableDeclarator')

                  if (variableDeclaratorIdx != -1) {
                    const variableDeclarator = ancestors[variableDeclaratorIdx]

                    // Determines the location where we'll save the propertyName
                    const useLength = ancestors[variableDeclaratorIdx + 1] && ancestors[variableDeclaratorIdx + 1].type !== 'FunctionExpression'

                    addDisplayName(parser, variableDeclarator, useLength)
                  }
                }
              }
            },

            FunctionDeclaration(node) {
              // Matches: export default function Foo() with returning statement calling React.createElement
              if (node.id.type === 'Identifier' && node.body && node.body.body && node.body.body.filter(thing => thing.type === 'ReturnStatement')) {
                const returnStatements = node.body.body.filter(thing => thing.type === 'ReturnStatement')

                if (returnStatements.length > 0) {
                  const returnStatement = returnStatements[0]
                  if (
                    returnStatement &&
                    returnStatement.argument.callee &&
                    returnStatement.argument.callee.type == 'MemberExpression' &&
                    returnStatement.argument.callee.object.name === 'React' &&
                    returnStatement.argument.callee.property.name === 'createElement'
                  ) {
                    addDisplayName(parser, node, false)
                  }
                }
              }
            }
          })
        })
      })
    })
  }
}

function addDisplayName(parser, node, useLength) {
  if (updatedNodes.has(node)) {
    return // Already added propertyName for this node
  }
  
  const componentName = node.id.name
  const dep = new ModuleAppenderDependency(`${componentName}.displayName = "${componentName}";`, useLength)
  dep.loc = node.loc
  parser.state.current.addDependency(dep)

  updatedNodes.add(node)
}

module.exports = WebpackReactComponentNamePlugin
