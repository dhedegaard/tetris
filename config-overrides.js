module.exports = (config, env) => {
  config.plugins.forEach(plugin => {
    if (plugin.constructor.name === 'GenerateSW') {
      plugin.config.skipWaiting = true
      plugin.config.runtimeCaching = [
        {
          urlPattern: /.*/,
          handler: 'NetworkFirst'
        }
      ]
    }
  })
  return config
}
