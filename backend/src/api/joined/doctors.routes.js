const express = require('express');
const router = express.Router();
const Person = require('../persons/persons.model');
const Clinic = require('../clinics/clinics.model');
const Doctor = require('../doctors/doctors.model');

const { getDoctor } = require('../../lib/getters');

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    res.json(await getDoctor(id));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req,res, next) => {
  try {
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