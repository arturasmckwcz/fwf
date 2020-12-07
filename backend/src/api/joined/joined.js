const express = require('express');
const joined = express.Router();

const doctors = require('./doctors/doctors.routes');
// const patients = require('./patients/patients.routes');
// const persons = require('./persons/persons.routes');
// const products = require('./products/products.routes');
// const clinics = require('./clinics/clinics.routes');
// const joined = require('./joined/joined');

joined.use('/doctors', doctors);
// api.use('/patients', patients);
// api.use('/persons', persons);
// api.use('/products', products);
// api.use('/clinics', clinics);
// api.use('/joined', joined);

joined.get('/', (req, res) => {
    res.json({
        message: "FWF API Joined Queries",
    });
});

module.exports = joined;