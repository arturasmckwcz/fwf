const express = require('express');
const router = express.Router();
const Patient = require('../patients/patients.model');
const Person = require('../persons/persons.model');
const Clinic = require('../clinics/clinics.model');
const { getPatientCode } = require('../../lib/codes');

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const patient = await Patient.query()
      .where('deleted_at',  null)
      .findById(id);
    let clinic;
    if (patient.clinic_id) {
      clinic = await Clinic.query()
        .where('deleted_at', null)
        .select('name')
        .findById(patient.clinic_id);
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
      .findById(patient.person_id);
    res.json({
      'id': patient.id,
      ... person,
      'clinic': patient.clinic_id
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
    const patient = await Patient.query()
      .insert({
        'person_id': person.id,
        'clinic_id': req.body.clinic_id ? req.body.clinic_id : undefined,
        'code': getPatientCode(),
      });
    res.json(patient)
  } catch (error) {
    next(error);
  }
});

module.exports = router;