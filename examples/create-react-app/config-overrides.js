const WebpackReactComponentNamePlugin = require("webpack-react-component-name");
const { override, addWebpackPlugin } = require("customize-cra");

module.exports = override(
    addWebpackPlugin(new WebpackReactComponentNamePlugin())
);
