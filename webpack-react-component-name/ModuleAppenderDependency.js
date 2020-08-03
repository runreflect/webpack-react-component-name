const NullDependency = require("webpack/lib/dependencies/NullDependency");

class ModuleAppenderDependency extends NullDependency {
  constructor(expression, useLength) {
    super();
    this.expression = expression
    this.useLength = useLength
  }

  updateHash(hash) {
    hash.update(this.expression + "");
    hash.update(this.theLength + "");
  }
}

ModuleAppenderDependency.Template = class ModuleAppenderDependencyTemplate {
  apply(dep, source) {
    const length = dep.useLength ? source._source._value.length + 1 : undefined
    source.insert(length, dep.expression)
  }
};

module.exports = ModuleAppenderDependency;
