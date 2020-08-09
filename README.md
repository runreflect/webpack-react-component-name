**webpack-react-component-name** is a Webpack plugin that makes your custom
React components visible within React Dev Tools and accessible by the React
selector logic built into [https://reflect.run](Reflect).

## Installation

1. Install via npm:

```
npm install webpack-react-component-name -save-dev
```

2. Add the plugin to your Webpack configuration:

```
  plugins: [
    new WebpackReactComponentNamePlugin()
  ],
```
