const utils = require('./utils')
const constants = require('./constants')
const _ = require('lodash')
const fs = require('fs')

const WebpackReactComponentNamePlugin = require('../index.js')
const ModuleAppenderDependency = require('../lib/module-appender')

const DISPLAY_NAME_REGEX = /\.displayName=/g

describe('WebpackReactComponentNamePlugin', () => {

  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
  })

  it('generates displayName for components in TodoMVC example', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.TODOMVC_WEBPACK_CONFIG)) {
      const result = await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.TODOMVC_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(result.compilation.dependencyTemplates.get(ModuleAppenderDependency)).toBeDefined()
      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="Footer"')
      expect(minifiedSource).toContain('.displayName="TodoList"')
      expect(minifiedSource).toContain('.displayName="TodoItem"')
      expect(numDisplayNameProperties).toEqual(6) // Components, plus Provider, Consumer, and Router
    }
  })

  it('generates displayName for components defined via anonymous function (variation 1)', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.ANON_FUNC_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)      

      const minifiedSource = readSourceFile(constants.ANON_FUNC_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="Button"')
      expect(numDisplayNameProperties).toEqual(3)
    }
  })

  it('generates displayName for components defined via anonymous function (variation 2)', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.ANON_FUNC2_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.ANON_FUNC2_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="Badge"')
      expect(numDisplayNameProperties).toEqual(3)
    }
  })

  it('generates displayName for components defined via anonymous function (variation 3)', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.ANON_FUNC3_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.ANON_FUNC3_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="Root"')
      expect(minifiedSource).toContain('.displayName="List"')
      expect(minifiedSource).toContain('.displayName="Detail"')
      expect(numDisplayNameProperties).toEqual(5)
    }
  })

  it('generates displayName for components defined via class', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.CLASS_COMPONENT_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.CLASS_COMPONENT_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="ExampleDiv"')
      expect(numDisplayNameProperties).toEqual(3)
    }
  })

  it('generates displayName for components defined as default function', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.DEFAULT_FUNC_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.DEFAULT_FUNC_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="Footer"')
      expect(numDisplayNameProperties).toEqual(3)
    }
  })

  it('generates displayName for components defined as default function (variation 2)', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.DEFAULT_FUNC2_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.DEFAULT_FUNC2_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="Foo"')
      expect(numDisplayNameProperties).toEqual(4)
    }
  })

  it('generates displayName for components defined as forward ref', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.FORWARD_REF_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.FORWARD_REF_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="Dialog"')
      expect(numDisplayNameProperties).toEqual(3)
    }
  })

  it('generates displayName for components defined as pure component', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.PURE_COMPONENT_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.PURE_COMPONENT_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="UIButton"')
      expect(minifiedSource).toContain('.displayName="PureVariantOne"')
      expect(numDisplayNameProperties).toEqual(4)
    }
  })

  it('generates displayName for components extending JSXElement', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.JSXELEMENT_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.JSXELEMENT_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="AdminTextSetting"')
      expect(minifiedSource).toContain('.displayName="TextSetting"')
      expect(numDisplayNameProperties).toEqual(4)
    }
  })

  it('parses and ignores files that do not include React component definitions', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.PARSE_TESTS_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.PARSE_TESTS_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(numDisplayNameProperties).toEqual(10)
    }
  })

  it('detects memoized React components', async () => {
    for (const webpackConfig of generateWebpackConfigs(constants.MEMOIZED_WEBPACK_CONFIG)) {
      await utils.testWebpackPlugin(webpackConfig)

      const minifiedSource = readSourceFile(constants.MEMOIZED_WEBPACK_CONFIG.output.filename)

      const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

      expect(minifiedSource).toContain('.displayName="App"')
      expect(minifiedSource).toContain('.displayName="Button"')
      expect(minifiedSource).toContain('.displayName="MemoizedButton"')
      expect(minifiedSource).toContain('.displayName="MemoizedButton2"')
      expect(numDisplayNameProperties).toEqual(5)
    }
  })

  it('handles Preact app', async () => {
    // Note that this test only works with one flavor of Babel loader, so we're only testing one here
    await utils.testWebpackPlugin(_.merge(constants.PREACT_TESTS_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
      module: constants.DEFAULT_BABEL_CONFIG,
    }))

    const minifiedSource = readSourceFile(constants.PREACT_TESTS_WEBPACK_CONFIG.output.filename)

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="TodoFooter"')
    expect(minifiedSource).toContain('.displayName="TodoItem"')
    expect(numDisplayNameProperties).toEqual(3)
  })
})

/**
 * Returns an array Webpack configs representing each permutation of Babel loader we want to test
 */
function generateWebpackConfigs(baseWebpackConfig) {
  return constants.BABEL_LOADER_CONFIGS.map(babelLoader => {
    return _.merge(_.cloneDeep(baseWebpackConfig), {
      plugins: [new WebpackReactComponentNamePlugin()],
      module: babelLoader,
    })
  })
}

function readSourceFile(filename) {
  return fs.readFileSync('dist/examples/' + filename).toString()
}
