const express = require('express');
const joined = express.Router();

const doctors = require('./doctors.routes');
const blood = require('./blood.routes');
const patients = require('./patients.routes');
const prescriptions = require('./prescriptions.routes');

joined.use('/doctors', doctors);
joined.use('/blood', blood);
joined.use('/patients', patients);
joined.use('/prescriptions', prescriptions);

joined.get('/', (req, res) => {
    res.json({
        message: "FWF API Joined Queries",
    });
});

module.exports = joined;