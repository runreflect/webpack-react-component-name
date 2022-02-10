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
