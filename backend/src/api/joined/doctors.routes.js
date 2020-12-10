const express = require('express');
const router = express.Router();
const Person = require('../persons/persons.model');
const Clinic = require('../clinics/clinics.model');
const Doctor = require('../doctors/doctors.model');

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const doctor = await Doctor.query()
      .where('deleted_at',  null)
      .findById(id);
    let clinic;
    if (doctor.clinic_id) {
      clinic = await Clinic.query()
        .where('deleted_at', null)
        .select('name')
        .findById(doctor.clinic_id);
    };
    const person = await Person.query()
      .where('deleted_at',  null)
      .select(
        'first',
        'last',
        'email',
        'phone',
        'address'
        )
      .findById(doctor.person_id);
    res.json({
      'id': doctor.id,
      ... person,
      'clinic': doctor.clinic_id
        ? clinic.name
        : undefined
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req,res, next) => {
  try {
    const person = await Person.query()
      .insert({
        'first': req.body.first,
        'last': req.body.last,
        'gender': req.body.gender ? req.body.gender : "undefined",
        'age': req.body.age ? req.body.age : 0,
        'code': req.body.code ? req.body.code : undefined,
        'email': req.body.email ? req.body.email : undefined,
        'address': req.body.address ? req.body.address : undefined,
        'phone': req.body.phone ? req.body.phone : undefined,
      });
    const doctor = await Doctor.query()
      .insert({
        'person_id': person.id,
        'clinic_id': req.body.clinic_id ? req.body.clinic_id : undefined,
      });
    res.json(doctor)
  } catch (error) {
    next(error);
  }
});

module.exports = router;