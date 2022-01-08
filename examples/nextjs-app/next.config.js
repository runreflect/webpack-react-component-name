const WebpackReactComponentNamePlugin = require("webpack-react-component-name");

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(new WebpackReactComponentNamePlugin());
    return config;
  },
};
