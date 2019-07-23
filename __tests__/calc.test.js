// Jest unit tests
const { add } = require('../src/calc')

test('adds 2 + 3', () => {
  expect(add(2, 3)).toBe(5)
})
