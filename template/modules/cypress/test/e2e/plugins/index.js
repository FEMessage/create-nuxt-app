/**
 * https://docs.cypress.io/api/plugins/configuration-api.html#Switch-between-multiple-configuration-files
 */
const path = require('path')
const fs = require('fs')

async function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(__dirname, '../config', `${file}.json`)

  return JSON.parse(await fs.promises.readFile(pathToConfigFile, 'utf-8'))
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (_on, config) => {
  // accept a configFile value or use development by default
  const file = config.env.config || 'local'

  return getConfigurationByFile(file)
}