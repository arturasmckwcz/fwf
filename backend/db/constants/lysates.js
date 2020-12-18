const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const getLysatesFromFile = (url) => {
  const csvData = fs.readFileSync(
    url,
    'utf8'
  );
  return Papa.parse(csvData, {
    header: true,
    })
    .data.map(({ production, first, last, code, status }) => ({
      name,
      code,
    }));
};


const lysates = getLysatesFromFile(path.join(__dirname, '..', 'db', 'sources', 'lysates.csv'));


module.exports = lysates;
