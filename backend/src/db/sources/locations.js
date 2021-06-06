const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')

const getLocationsFromFile = url => {
  const csvData = fs.readFileSync(url, 'utf8')
  return Papa.parse(csvData, {
    header: true,
  }).data.map(({ container, handle, shelf, line, place }) => ({
    container,
    handle,
    shelf,
    line,
    place,
  }))
}

const locations = getLocationsFromFile(
  path.join(__dirname, '..', 'sources', 'locations_minus_150.csv')
).concat(
  getLocationsFromFile(
    path.join(__dirname, '..', 'sources', 'locations_nitrotank.csv')
  )
)

module.exports = locations
