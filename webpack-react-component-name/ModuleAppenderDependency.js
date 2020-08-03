const NullDependency = require("webpack/lib/dependencies/NullDependency");

class ModuleAppenderDependency extends NullDependency {
	constructor(expression) {
    super();
		this.expression = expression;
	}

	updateHash(hash) {
		hash.update(this.expression + "");
	}
}

ModuleAppenderDependency.Template = class ModuleAppenderDependencyTemplate {
	apply(dep, source, runtime) {
    console.log('int ittttt')

    // const concatSource = new ConcatSource()
    // concatSource.add(source)
    
    source.insert(source.length, dep.expression)
  }
};

module.exports = ModuleAppenderDependency;
