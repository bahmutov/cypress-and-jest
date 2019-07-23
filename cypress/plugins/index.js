module.exports = (on, config) => {
  on('task', require('@cypress/code-coverage/task'))
  on(
    'file:preprocessor',
    require('@cypress/code-coverage/use-browserify-istanbul')
  )
}
