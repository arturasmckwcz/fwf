const express = require('express');
const router = express.Router();
const Blood = require('../blood/blood.model');
const Person = require('../persons/persons.model');
const Clinic = require('../clinics/clinics.model');
const { getBloodCode } = require('../../lib/codes');

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const blood = await Blood.query()
      .where('deleted_at',  null)
      .findById(id);
    let clinic;
    if (blood.clinic_id) {
      clinic = await Clinic.query()
        .where('deleted_at', null)
        .select('name')
        .findById(blood.clinic_id);
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
      .findById(blood.person_id);
    res.json({
      'id': blood.id,
      ... person,
      'clinic': blood.clinic_id
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
    const blood = await Blood.query()
      .insert({
        'person_id': person.id,
        'clinic_id': req.body.clinic_id ? req.body.clinic_id : undefined,
        'code': getBloodCode(),
        'draw_date': req.body.draw_date,
        'arrive_date': new Date().toISOString(),
      });
    res.json(blood)
  } catch (error) {
    next(error);
  }
});

module.exports = router;