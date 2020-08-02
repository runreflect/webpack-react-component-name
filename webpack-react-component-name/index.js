const walk = require("acorn-walk")
const ConstDependency = require('webpack/lib/dependencies/ConstDependency')
console.log(walk)

class WebpackReactComponentNamePlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    console.log("FROM WebpackReactComponentNamePlugin PLUGIN")

    compiler.hooks.normalModuleFactory.tap('WebpackReactComponentNamePlugin', factory => {
      factory.hooks.parser.for('javascript/auto').tap('WebpackReactComponentNamePlugin', (parser, options) => {
        console.log('here')
        parser.hooks.program.tap("WebpackReactComponentNamePlugin", (ast, comments) => {
          console.log('--- NEW AST ---', parser.state.current.resource)

          if (parser.state.current.resource == null || parser.state.current.resource.indexOf("node_modules") !== -1) {
            return
          }

          // if (parser.state.current.resource.indexOf("Text.js") !== -1) {
          //   console.log(JSON.stringify(ast, null, '\t')/*JSON.stringify(comments, null, '\t')*/)
          // }

          walk.ancestor(ast, {
            // React.createClass({})
            CallExpression(node, ancestors) {
              if (node.callee.type == 'MemberExpression' && node.callee.object.name === 'React' && node.callee.property.name === 'createClass') {
                // console.log('found it', node)
                var dep = new ConstDependency('this.displayName = "cool";', JSON.stringify("cool"));
                dep.loc = node.loc;
                parser.state.current.addDependency(dep);
              }
            },

            CallExpression(node, ancestors) {
              if (node.callee && node.callee.type == 'MemberExpression' && node.callee.object.name === 'React' && node.callee.property.name === 'createElement') {
                console.log('found 3', node)
                var dep = new ConstDependency('this.displayName = "cool";', JSON.stringify("cool"));
                dep.loc = node.loc;
                parser.state.current.addDependency(dep);
                //TODO then walk up ancestors to find function / etc that it's defining
              }
            },

            // FunctionDeclaration(node) {
            //   // it's a function that...

            //   // isnt async

            //   // has single param '_ref'... (maybe dont rely on this)
            //   // Note: Babel creates this
            //   // - https://github.com/algolia/react-instantsearch/issues/1543
            //   // - 

            //   // has a return statement
          
            //   // callee is React createElement


            //   if (node.id.type === 'Identifier' && node.body && node.body.body && node.body.body.filter(thing => thing.type === 'ReturnStatement')) {
            //     const returnStatements = node.body.body.filter(thing => thing.type === 'ReturnStatement')

            //     if (returnStatements.length > 0) {
            //       const returnStatement = returnStatements[0]
            //       if (returnStatement && returnStatement.argument.callee && returnStatement.argument.callee.type == 'MemberExpression' && returnStatement.argument.callee.object.name === 'React' && returnStatement.argument.callee.property.name === 'createElement') {
            //         console.log('found 3', returnStatement)
            //       }
            //     }
            //   }
            // }
          })

          // Docs on the 'ESTree' format: 
          // - https://github.com/estree/estree
          // - https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API

          // Example of how to modify the AST taken from https://github.com/webpack/webpack/blob/fde018300aa52262c384e937c408d5dd97d62951/lib/UseStrictPlugin.js#L15

          // const dep = new ConstDependency("", firstNode.range);
          // dep.loc = firstNode.loc;
          // parser.state.current.addDependency(dep);
          // parser.state.module.buildInfo.strict = true;

        //  console.log(JSON.stringify(ast, null, '\t'))
        })
      });
    });

    // compiler.hooks.compilation.tap(
		// 	"WebpackReactComponentNamePlugin",
		// 	(compilation, { normalModuleFactory }) => {
    //     console.log('fdfsfsdfds')
		// 		const handler = parser => {
    //       console.log("fdsffdfsdfsffs")
		// 			parser.hooks.program.tap("WebpackReactComponentNamePlugin", ast => {
    //         console.log(ast)
    //       })
    //     }
    //   }
    // )
    
  }
}

module.exports = WebpackReactComponentNamePlugin