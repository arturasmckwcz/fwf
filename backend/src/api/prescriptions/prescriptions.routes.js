const express = require('express');
const router = express.Router();
const Prescription = require('./prescriptions.model');

router.get('/', async (req, res) => {
  const prescriptions = await Prescription.query()
    .where('deleted_at', null);
  res.json(prescriptions);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (prescription) {
      return res.json(prescription);
    }
    return next();
  } catch (error) {
    return next(error);
  };
});

module.exports = router;