const { Minimatch } = require("minimatch")

/**
 * Resolves the matchers in an array.
 */
function resolveMatchers(match)  {
  if (typeof match === 'string') {
    const minimatch = new Minimatch(match)
    return (path) => minimatch.match(path)
  }
  if (match instanceof RegExp) return (path) => match.test(path)
  if (typeof match === 'function') return match
  throw new Error(`Unrecognized parameter: ${match}; expected string, RegExp, or function.`)
}


/**
 * Reads and validates the options passed to the Webpack plugin.
 */
class OptionsParser {
  parse(options) {
    const optionsWithDefaults = {
      parseDependencies: options?.parseDependencies ?? false,
      exclude: options?.exclude ?? [], 
      include: options?.include ?? []
    }

    // Check if caller set any invalid options
    for (const [key, value] of Object.entries(options ?? {})) {
      if (!optionsWithDefaults.hasOwnProperty(key) && value != null) {
        throw new Error(`Unsupported option ${key} with value ${value}`)
      }
    }

    if (!optionsWithDefaults.parseDependencies) optionsWithDefaults.exclude.push(this.ignoreNodeModules)
    optionsWithDefaults.include = optionsWithDefaults.include.map(resolveMatchers)
    optionsWithDefaults.exclude = optionsWithDefaults.exclude.map(resolveMatchers)

    return optionsWithDefaults
  }

  ignoreNodeModules(path) {
    return path.indexOf("node_modules") !== -1
  }
}

module.exports = OptionsParser
