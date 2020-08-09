const webpack = require('webpack')

exports.testWebpackPlugin = function testWebpackPlugin(webpackConfig) {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (stats.compilation.errors.length > 0) {
        reject(stats.compilation.errors)
      } else if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}
