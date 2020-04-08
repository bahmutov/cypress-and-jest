module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)

  on(
    'file:preprocessor',
    require('@cypress/code-coverage/use-browserify-istanbul')
  )

  // important - return config because code coverage plugin
  // modifies environment variables there
  return config
}
