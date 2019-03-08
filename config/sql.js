const mssql = require('mssql')
const config = require('./config')
const sql = mssql.connect(config.slq)

module.exports = sql