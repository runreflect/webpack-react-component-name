const { resolve } = require("path");
const WebpackReactComponentNamePlugin = require("./webpack-react-component-name");
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: resolve(__dirname, "src/index.js"),
  output: {
    path: resolve(__dirname, "bin"),
    filename: "bundle.js"
  },
  devServer: {
    https: true,
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    writeToDisk: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html',
      filename: 'index.html',
    }),
    new WebpackReactComponentNamePlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
}
