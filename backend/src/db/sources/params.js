const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')

const getParamsFromFile = url => {
  const csvData = fs.readFileSync(url, 'utf8')
  return Papa.parse(csvData, {
    header: true,
  }).data.map(({ code, description, mesurement, dlp, cik, svf }) => ({
    code,
    description,
    mesurement,
    dlp,
    cik,
    svf,
  }))
}

const params = getParamsFromFile(
  path.join(__dirname, 'CSV ready parameter.csv')
)

module.exports = params
