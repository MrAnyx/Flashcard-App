module.exports = {
    apps: [
      {
        name: 'flashcard_app',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
      }
    ]
  }
  