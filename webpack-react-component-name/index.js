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

          console.log(JSON.stringify(ast, null, '\t'))

          // Example of how to modify the AST taken from https://github.com/webpack/webpack/blob/fde018300aa52262c384e937c408d5dd97d62951/lib/UseStrictPlugin.js#L15

          // const dep = new ConstDependency("", firstNode.range);
          // dep.loc = firstNode.loc;
          // parser.state.current.addDependency(dep);
          // parser.state.module.buildInfo.strict = true;

         console.log(JSON.stringify(ast, null, '\t'))
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