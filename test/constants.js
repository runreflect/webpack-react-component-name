const path = require('path')

const OUTPUT_DIR = path.resolve(__dirname, '../dist/examples')

const PRODUCTION_MODE = 'production'
const MODULE_CONFIG = {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            ["@babel/plugin-transform-react-jsx"],
          ]
        },
      }
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }
  ]
}

exports.ANON_FUNC_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/anonfunc/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'anonfuncbundle.js'
  },
  module: MODULE_CONFIG
}

exports.ANON_FUNC2_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/anonfunc2/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'anonfunc2bundle.js'
  },
  module: MODULE_CONFIG
}

exports.CLASS_COMPONENT_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/classcomponent/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'classcomponentbundle.js'
  },
  module: MODULE_CONFIG
}

exports.DEFAULT_FUNC_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/defaultfunc/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'defaultfuncbundle.js'
  },
  module: MODULE_CONFIG
}

exports.FORWARD_REF_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/forwardref/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'forwardrefbundle.js'
  },
  module: MODULE_CONFIG
}

exports.PURE_COMPONENT_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/purecomponent/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'purecomponentbundle.js'
  },
  module: MODULE_CONFIG
}

exports.TODOMVC_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/todomvc/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'todomvcbundle.js'
  },
  module: MODULE_CONFIG
}
