const OptionsParser = require('../lib/options-parser')

const optionsParser = new OptionsParser()

describe('OptionsParser', () => {
  it('sets default options if undefined', () => {
    expect(optionsParser.parse(undefined)).toEqual({ parseDependencies: false })
  })

  it('sets options passed to parser', () => {
    expect(optionsParser.parse({ parseDependencies: true })).toEqual({ parseDependencies: true })
  })

  it('throws error if unsupported option is passed', () => {
    expect(function() {
      optionsParser.parse({ foo: 'bar' })
    }).toThrow(new Error('Unsupported option foo with value bar'))
  })
})
