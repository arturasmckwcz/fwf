const express = require('express');
const router = express.Router();
const Person = require('../persons/persons.model');
const Doctor = require('../doctors/doctors.model');

const { getDoctor, getDoctorsJoined } = require('../../lib/getters');

router.get('/', async (req, res, next) => {
  try {
    res.json(await getDoctorsJoined());
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await getDoctor(id));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const person = await Person.query().insertAndFetch({
      first: req.body.first,
      last: req.body.last,
      age: req.body.age || 0,
      gender: req.body.gender || 'undefined',
      code: req.body.code || undefined,
      email: req.body.email || undefined,
      phone: req.body.phone || undefined,
      address: req.body.address || undefined,
    });
    const doctor = await Doctor.query().insertAndFetch({
      person_id: person.id,
      clinic_id: req.body.clinic_id || undefined,
    });
    res.json(doctor);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
