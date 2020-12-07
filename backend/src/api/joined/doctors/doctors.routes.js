const express = require('express');
const router = express.Router();
const Person = require('./../../persons/persons.model');
const Doctor = require('./../../doctors/doctors.model');
// const Clinic = require('./../../clinics/clinics.model')

router.get('/:id', async (req, res, next) => {
  const {id} = req.params;
  const doctor = await Doctor.query()
    .where({deleted_at: null})
    .findById(id);
  const person = await Person.query()
    .where({deleted_at: null})
    .findById(doctor.person_id);
  res.json({
    id: doctor.id,
    person_id: person.id,
    first: person.first,
    last: person.last,
    email: person.email,
    phone: person.phone,
    address: person.address,
  });
});

module.exports = router;