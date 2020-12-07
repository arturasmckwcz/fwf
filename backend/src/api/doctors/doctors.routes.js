const express = require('express');
const router = express.Router();
const queries = require('./doctors.queries');
const Doctor = require('./doctors.model');

router.get('/', async (req, res) => {
  const doctors = await Doctor.query();
  res.json(doctors);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (doctor) {
      return res.json(doctor);
    }
    next();
  } catch (error) {
    next(error);
  };
});

module.exports = router;