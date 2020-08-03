const walk = require("acorn-walk")
const ModuleAppenderDependency = require('./ModuleAppenderDependency')

// Docs on the 'ESTree' format: 
// - https://github.com/estree/estree
// - https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
//
// Example of how to modify the AST taken from https://github.com/webpack/webpack/blob/fde018300aa52262c384e937c408d5dd97d62951/lib/UseStrictPlugin.js#L15
class WebpackReactComponentNamePlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    console.log("FROM WebpackReactComponentNamePlugin PLUGIN")

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
      factory.hooks.parser.for('javascript/auto').tap('WebpackReactComponentNamePlugin', (parser, options) => {
        console.log('here')
        parser.hooks.program.tap("WebpackReactComponentNamePlugin", (ast, comments) => {
          console.log('--- NEW AST ---', parser.state.current.resource)

          if (parser.state.current.resource == null || parser.state.current.resource.indexOf("node_modules") !== -1) {
            return
          }

          const source = parser.state.current.originalSource()._value

          walk.simple(ast, {
            // Matches: const Foo extends React.Component
            VariableDeclarator(node) {
              if (node.id && node.id.type === 'Identifier' && node.init && node.init.callee && node.init.callee.type === 'FunctionExpression' && node.init.callee.params && node.init.callee.params.length > 0 && node.init.callee.params[0].type === 'Identifier' && node.init.callee.params[0].name === '_React$Component') {
                const componentName = node.id.name
                const dep = new ModuleAppenderDependency(`${componentName}.displayName = "${componentName}";`, true) // a single number as second argument is an insert not a replace
                dep.loc = node.loc
                parser.state.current.addDependency(dep)
                // console.log('source', source.substring(node.range[0], node.range[1]))
              }
            },

            // Matches: React.createClass({}) - this is no longer supported by React so I'm going to remove this
            CallExpression(node) {
              if (node.callee.type == 'MemberExpression' && node.callee.object.name === 'React' && node.callee.property.name === 'createClass') {
                console.log('found legacy', node)
                // var dep = new ConstDependency('this.displayName = "cool";', node.range)
                // dep.loc = node.loc;
                // parser.state.current.addDependency(dep);
                // parser.state.current.addVariable("foo", JSON.stringify("toddtest"))
              }
            },

            // Matches: export default function Footer() with returning statement calling React.createElement
            FunctionDeclaration(node) {
              if (node.id.type === 'Identifier' && node.body && node.body.body && node.body.body.filter(thing => thing.type === 'ReturnStatement')) {
                const returnStatements = node.body.body.filter(thing => thing.type === 'ReturnStatement')

                if (returnStatements.length > 0) {
                  const returnStatement = returnStatements[0]
                  if (returnStatement && returnStatement.argument.callee && returnStatement.argument.callee.type == 'MemberExpression' && returnStatement.argument.callee.object.name === 'React' && returnStatement.argument.callee.property.name === 'createElement') {
                    console.log('found 3', node, node.id.name)
                    const componentName = node.id.name
 
                    const dep = new ModuleAppenderDependency(`${componentName}.displayName = "${componentName}";`, false) // a single number as second argument is an insert not a replace
                    dep.loc = node.loc
                    parser.state.current.addDependency(dep)
                    // console.log('source', source.substring(node.range[0], node.range[1]))
                  }
                }
              }
            }
          })

        })
      });
    });
  }
}

module.exports = WebpackReactComponentNamePlugin