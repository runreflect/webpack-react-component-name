const NullDependency = require("webpack/lib/dependencies/NullDependency")

class ModuleAppenderDependency extends NullDependency {
  constructor(expression, range) {
    super()
    this.expression = expression
    this.range = range
  }

  updateHash(hash) {
    hash.update(this.expression + "")
    hash.update(this.theLength + "")
  }
}

ModuleAppenderDependency.Template = class ModuleAppenderDependencyTemplate {
  apply(dep, source) {
    source.insert(dep.range[1], dep.expression)
  }
}

module.exports = ModuleAppenderDependency
