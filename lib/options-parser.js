const { Minimatch } = require("minimatch")

/**
 * Resolves the matchers into a function, to provide a 
 * consistent interface regardless of the matcher type.
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
    }

    // Check if caller set any invalid options
    for (const [key, value] of Object.entries(options ?? {})) {
      if (!optionsWithDefaults.hasOwnProperty(key) && value != null) {
        throw new Error(`Unsupported option ${key} with value ${value}`)
      }
    }

    return optionsWithDefaults
  }
}

module.exports = OptionsParser
