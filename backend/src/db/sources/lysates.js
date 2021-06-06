const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')

const getLysatesFromFile = url => {
  const csvData = fs.readFileSync(url, 'utf8')
  return Papa.parse(csvData, {
    header: true,
  }).data.map(({ name, code }) => ({
    name,
    code,
  }))
}

const lysates = getLysatesFromFile(path.join(__dirname, 'lysates.csv'))

module.exports = lysates
