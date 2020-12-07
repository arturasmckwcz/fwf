const express = require('express');
const router = express.Router();
const Clinic = require('./clinics.model');

router.get('/', async (req, res) => {
  const clinics = await Clinic.query()
    .where('deleted_at', null);
  res.json(clinics);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    // TODO: should we validate the ID?
    const clinic = await Clinic.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (clinic) {
      return res.json(clinic);
    }
    return next();
  } catch (error) {
    return next(error);
  };
});

module.exports = router;