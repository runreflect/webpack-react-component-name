const utils = require('./utils')
const constants = require('./constants')
const _ = require('lodash')

const WebpackReactComponentNamePlugin = require('../index.js')
const ModuleAppenderDependency = require('../lib/module-appender')

const DISPLAY_NAME_REGEX = /\.displayName=/g

describe('WebpackReactComponentNamePlugin', () => {
  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
  })

  it('generates displayName for components in TodoMVC example', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.TODOMVC_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.TODOMVC_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(result.compilation.dependencyTemplates.get(ModuleAppenderDependency)).toBeDefined()
    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="Footer"')
    expect(minifiedSource).toContain('.displayName="TodoList"')
    expect(minifiedSource).toContain('.displayName="TodoItem"')
    expect(numDisplayNameProperties).toEqual(7) // Components, plus Provider, Consumer, and Router
  })

  it('generates displayName for components defined via anonymous function (variation 1)', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.ANON_FUNC_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.ANON_FUNC_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="Button"')
    expect(numDisplayNameProperties).toEqual(4)
  })

  it('generates displayName for components defined via anonymous function (variation 2)', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.ANON_FUNC2_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.ANON_FUNC2_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="Badge"')
    expect(numDisplayNameProperties).toEqual(4)
  })

  it('generates displayName for components defined via anonymous function (variation 3)', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.ANON_FUNC3_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.ANON_FUNC3_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="Root"')
    expect(minifiedSource).toContain('.displayName="List"')
    expect(minifiedSource).toContain('.displayName="Detail"')
    expect(numDisplayNameProperties).toEqual(6)
  })

  it('generates displayName for components defined via class', async () => {
    const result = await utils.testWebpackPlugin  (_.merge(constants.CLASS_COMPONENT_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.CLASS_COMPONENT_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="ExampleDiv"')
    expect(numDisplayNameProperties).toEqual(4)
  })

  it('generates displayName for components defined as default function', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.DEFAULT_FUNC_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.DEFAULT_FUNC_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="Footer"')
    expect(numDisplayNameProperties).toEqual(4)
  })

  it('generates displayName for components defined as default function (variation 2)', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.DEFAULT_FUNC2_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.DEFAULT_FUNC2_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="Foo"')
    expect(numDisplayNameProperties).toEqual(5)
  })

  it('generates displayName for components defined as forward ref', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.FORWARD_REF_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.FORWARD_REF_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="Dialog"')
    expect(numDisplayNameProperties).toEqual(4)
  })

  it('generates displayName for components defined as pure component', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.PURE_COMPONENT_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.PURE_COMPONENT_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="UIButton"')
    expect(numDisplayNameProperties).toEqual(4)
  })

  it('generates displayName for components extending JSXElement', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.JSXELEMENT_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.JSXELEMENT_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="AdminTextSetting"')
    expect(minifiedSource).toContain('.displayName="TextSetting"')
    expect(numDisplayNameProperties).toEqual(5)
  })

  it('parses and ignores files that do not include React component definitions', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.PARSE_TESTS_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.PARSE_TESTS_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(numDisplayNameProperties).toEqual(11)
  })

  it('detects memoized React components', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.MEMOIZED_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.MEMOIZED_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="Button"')
    expect(minifiedSource).toContain('.displayName="MemoizedButton"')
    expect(minifiedSource).toContain('.displayName="MemoizedButton2"')
    expect(numDisplayNameProperties).toEqual(6)
  })

  it('handles Preact app', async () => {
    const result = await utils.testWebpackPlugin(_.merge(constants.PREACT_TESTS_WEBPACK_CONFIG, {
      plugins: [new WebpackReactComponentNamePlugin()],
    }))

    const minifiedSource = result.compilation.assets[constants.PREACT_TESTS_WEBPACK_CONFIG.output.filename]._value

    const numDisplayNameProperties = (minifiedSource.match(DISPLAY_NAME_REGEX) || []).length

    expect(minifiedSource).toContain('.displayName="App"')
    expect(minifiedSource).toContain('.displayName="TodoFooter"')
    expect(minifiedSource).toContain('.displayName="TodoItem"')
    expect(numDisplayNameProperties).toEqual(3)
  })
})
