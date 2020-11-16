const path = require('path')
const fs = require('fs-extra')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(__dirname, '../config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (_on, config) => {
  // accept a configFile value or use development by default
  const file = config.env.config || 'local'

  return getConfigurationByFile(file)
}
