const configs = require('../template.config.js')
const { addTemplate, list } = require('./Template.js')

configs.forEach(addTemplate)

module.exports = list()
