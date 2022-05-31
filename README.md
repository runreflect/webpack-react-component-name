## Overview

**webpack-react-component-name** is a Webpack plugin that makes your custom
React components visible within React Dev Tools and accessible by the React
selector logic built into [Reflect](https://reflect.run).

*Note: This branch contains the version of this plugin that is compatible with
Webpack 4. For support for later version of Webpack, see
[https://github.com/runreflect/webpack-react-component-name](https://github.com/runreflect/webpack-react-component-name).*

Normally React component names are minified during compilation.  This plugin
makes these component names available in production bundles by hooking into
Webpack's compilation process, traversing the AST looking for React component
definitions, and updating the emitted source code to populate the 
[displayName](https://reactjs.org/docs/react-component.html#displayname)
property.  This is the property that, when populated, is used by the React Dev
Tools extension to determine the name of a component.

Since we emit a `displayName` property value for each React component definition
(critically, **not** every React component *instance*), using this plugin will
result in a small size increase to your production bundles.

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

## Options

```json
{
  "parseDependencies": false,
  "include": [],
  "exclude": []
}
```

### parseDependencies

Type: `boolean`
Default: `false`

If set true, the plugin will name the components exported from node_modules.


### include 
Type: `(string | RegExp | (path: string) => boolean)[]` Default: `[]`

If the path matches any of the elements in this array, it will be included if it isn't explicitly excluded.

If the item is a `string`, it will use standard glob syntax. If the item is a Regular Expression, the path will be tested against it. If the item is a function, the path will be passed into it for testing. 

### exclude 
Type: `(string | RegExp | (path: string) => boolean)[]` Default: `[]`

If the path matches any of the elements in this array, it will be excluded.

If the item is a `string`, it will use standard glob syntax. If the item is a Regular Expression, the path will be tested against it. If the item is a function, the path will be passed into it for testing. 

A truthy result will be excluded. 
## Troubleshooting

As you probably know, there is more than one way to define a React component.  This
plugin attempts to detect every possible way of defining a component, but there may
be some we've missed.  See the `/examples` directory and the unit tests for examples
of the different permutations of React component definitions that we currently support.

If we are not detecting one of your components, please either file an Issue containing
example source for a component which is not detected, or feel free to open a PR with
the fix.

## License

This project is licensed under the terms of the MIT license.
