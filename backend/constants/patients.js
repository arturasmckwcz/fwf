const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const getPatientsFromFile = (url) => {
  const csvData = fs.readFileSync(
    url,
    'utf8'
  );
  return Papa.parse(csvData, {
    header: true,
    })
    .data.map(({ production, first, last, code, status }) => ({
      production,
      first,
      last,
      code,
      status,
    }));
};


const patients16 = getPatientsFromFile(path.join(__dirname, '..', 'db', 'sources', 'CSV ready DLP patient lists 2016-2020 - DLP16.csv'));
const patients17 = getPatientsFromFile(path.join(__dirname, '..', 'db', 'sources', 'CSV ready DLP patient lists 2016-2020 - DLP17.csv'));
const patients18 = getPatientsFromFile(path.join(__dirname, '..', 'db', 'sources', 'CSV ready DLP patient lists 2016-2020 - DLP18.csv'));
const patients19 = getPatientsFromFile(path.join(__dirname, '..', 'db', 'sources', 'CSV ready DLP patient lists 2016-2020 - DLP19.csv'));
const patients20 = getPatientsFromFile(path.join(__dirname, '..', 'db', 'sources', 'CSV ready DLP patient lists 2016-2020 - DLP20.csv'));

const patients = 
  patients16.concat(
  patients17.concat(
  patients18.concat(
  patients19.concat(
  patients20))));

module.exports = patients;

// module.exports = patients.data.map(({ production, first, last, code, status }) => ({
//   production,
//   first,
//   last,
//   code,
//   status,
// }));