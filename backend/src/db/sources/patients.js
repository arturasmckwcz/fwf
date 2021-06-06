const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')

const getPatientsFromFile = url => {
  const csvData = fs.readFileSync(url, 'utf8')
  return Papa.parse(csvData, {
    header: true,
  }).data.map(({ production, first, last, code, status, clinic }) => ({
    production,
    first,
    last,
    code,
    status,
    clinic,
  }))
}

const patients16 = getPatientsFromFile(
  path.join(__dirname, 'CSV ready DLP patient lists 2016-2020 - DLP16.csv')
)
const patients17 = getPatientsFromFile(
  path.join(__dirname, 'CSV ready DLP patient lists 2016-2020 - DLP17.csv')
)
const patients18 = getPatientsFromFile(
  path.join(__dirname, 'CSV ready DLP patient lists 2016-2020 - DLP18.csv')
)
const patients19 = getPatientsFromFile(
  path.join(__dirname, 'CSV ready DLP patient lists 2016-2020 - DLP19.csv')
)
const patients20 = getPatientsFromFile(
  path.join(__dirname, 'CSV ready DLP patient lists 2016-2020 - DLP20.csv')
)

const patientsCIK = getPatientsFromFile(path.join(__dirname, 'CIK.csv'))

const patients = patients16.concat(
  patients17.concat(
    patients18.concat(patients19.concat(patients20.concat(patientsCIK)))
  )
)

module.exports = patients
