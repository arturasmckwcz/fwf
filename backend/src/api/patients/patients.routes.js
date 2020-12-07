const express = require('express');
const router = express.Router();
const queries = require('./patients.queries');
const Patient = require('./patients.model');

router.get('/', async (req, res) => {
  const patients = await Patient.query()
    .where('deleted_at', null);
  res.json(patients);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Patient.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (patient) {
      return res.json(patient);
    }
    return next();
  } catch (error) {
    return next(error);
  };
});

module.exports = router;