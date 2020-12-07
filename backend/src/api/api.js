const express = require('express');
const api = express.Router();

const doctors = require('./doctors/doctors.routes');
const patients = require('./patients/patients.routes');
const persons = require('./persons/persons.routes');
const products = require('./products/products.routes');
const clinics = require('./clinics/clinics.routes');
const blood = require('./blood/blood.routes');
const lysates = require('./lysates/lysates.routes');
const prescriptions = require('./prescriptions/prescriptions.routes');
const productions = require('./productions/productions.routes');
const users = require('./users/users.routes');
const roles = require('./roles/roles.routes');
const joined = require('./joined/joined');

api.use('/doctors', doctors);
api.use('/patients', patients);
api.use('/persons', persons);
api.use('/products', products);
api.use('/clinics', clinics);
api.use('/blood', blood);
api.use('/lysates', lysates);
api.use('/prescriptions', prescriptions);
api.use('/productions', productions);
api.use('/users', users);
api.use('/roles', roles);
api.use('/joined', joined);

api.get('/', (req, res) => {
    res.json({
        message: "FWF API",
    });
});

module.exports = api;