const express = require('express');
const router = express.Router();
const Doctor = require('./doctors.model');
const doctorFields = ['person_id', 'clinic_id'];

router.get('/', async (req, res) => {
  const doctors = await Doctor.query()
    .select(doctorFields)
    .where('deleted_at', null);
  res.json(doctors);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.query()
      .where('deleted_at', null)
      .select(doctorFields)
      .findById(parseInt(id, 10) || 0);
    if (doctor) {
      return res.json(doctor);
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { id } = req.body;
    await Doctor.query()
      .updateAndFetch({ ...req.body, id: undefined })
      .where({ id });
    res.json({ id });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const doctor = await Doctor.query().insertAndFetch(req.body);
    res.json(doctor);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
