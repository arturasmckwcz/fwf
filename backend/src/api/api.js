const express = require('express');
const router = express.Router();

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
const pdfs = require('./storage/pdfs');

router.use('/doctors', doctors);
router.use('/patients', patients);
router.use('/persons', persons);
router.use('/products', products);
router.use('/clinics', clinics);
router.use('/blood', blood);
router.use('/lysates', lysates);
router.use('/prescriptions', prescriptions);
router.use('/productions', productions);
router.use('/users', users);
router.use('/roles', roles);
router.use('/joined', joined);
router.use('/pdfs', pdfs);

router.get('/', (req, res) => {
    res.json({
        message: "FWF API",
    });
});

module.exports = router;