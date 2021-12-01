const path = require('path')

const OUTPUT_DIR = path.resolve(__dirname, '../dist/examples')

const PRODUCTION_MODE = 'production'
const BABEL_CONFIG_WITH_PRESENT_ENV = {
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
            ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
            ["@babel/plugin-proposal-private-methods", { "loose": true }],
            [
              "@babel/plugin-proposal-class-properties",
              {
                "loose": true
              }
            ]
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

exports.DEFAULT_BABEL_CONFIG = BABEL_CONFIG_WITH_PRESENT_ENV

const BABEL_CONFIG_WITHOUT_PRESENT_ENV = {
  rules: [
    {
      test: /\.js?$/,
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-react"],
          plugins: [
            ["@babel/plugin-transform-react-jsx"],
            ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
            ["@babel/plugin-proposal-private-methods", { "loose": true }],
            [
              "@babel/plugin-proposal-class-properties",
              {
                "loose": true
              }
            ]
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

const BABEL_CONFIG_WITH_EMOTIONJS_PRESET = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules*$/,
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-react',
          '@emotion/babel-preset-css-prop'
        ],
        plugins: [
          ["@babel/plugin-transform-react-jsx"],
          ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
          ["@babel/plugin-proposal-private-methods", { "loose": true }],
          [
            "@babel/plugin-proposal-class-properties",
            {
              "loose": true
            }
          ]
        ]
      }
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }
  ]
}

exports.BABEL_LOADER_CONFIGS = [
  BABEL_CONFIG_WITH_PRESENT_ENV,
  BABEL_CONFIG_WITHOUT_PRESENT_ENV,
  BABEL_CONFIG_WITH_EMOTIONJS_PRESET,
]

exports.ANON_FUNC_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/anonfunc/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'anonfuncbundle.js'
  },
}

exports.ANON_FUNC2_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/anonfunc2/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'anonfunc2bundle.js'
  },
}

exports.ANON_FUNC3_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/anonfunc3/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'anonfunc3bundle.js'
  },
}

exports.CLASS_COMPONENT_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/classcomponent/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'classcomponentbundle.js'
  },
}

exports.DEFAULT_FUNC_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/defaultfunc/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'defaultfuncbundle.js'
  },
}

exports.DEFAULT_FUNC2_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/defaultfunc2/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'defaultfunc2bundle.js'
  },
}

exports.FORWARD_REF_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/forwardref/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'forwardrefbundle.js'
  },
}

exports.JSXELEMENT_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/jsxelement/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'jsxelementbundle.js'
  },
}

exports.MEMOIZED_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/memo/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'memoizedbundle.js'
  },
}

exports.PARSE_TESTS_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/parsetests/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'parsetestsbundle.js'
  },
}

exports.PREACT_TESTS_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/preact/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'preactbundle.js'
  },
  resolve: {
    symlinks: false,
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    },
    extensions: ['.mjs', '.js', '.jsx']
  },
}

exports.PURE_COMPONENT_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/purecomponent/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'purecomponentbundle.js'
  },
}

exports.TODOMVC_WEBPACK_CONFIG = {
  mode: PRODUCTION_MODE,
  entry: path.join(__dirname, '../examples/todomvc/src/index.js'),
  output: {
    path: OUTPUT_DIR,
    filename: 'todomvcbundle.js'
  },
}
