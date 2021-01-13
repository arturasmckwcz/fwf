const express = require('express');
const router = express.Router();
const Clinic = require('./clinics.model');
const clinicFields = ['id', 'name', 'web', 'address', 'email', 'phone'];

router.get('/', async (req, res) => {
  const clinics = await Clinic.query()
    .select(clinicFields)
    .where('deleted_at', null);
  res.json(clinics);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const clinic = await Clinic.query()
      .where('deleted_at', null)
      .select(clinicFields)
      .findById(parseInt(id, 10) || 0);
    if (clinic) {
      return res.json(clinic);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const clinic = await Clinic.query().insertAndFetch(req.body);
    res.json(clinic);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { id } = req.body;
    await Clinic.query()
      .updateAndFetch({ ...req.body, id: undefined })
      .where({ id });
    res.json({ id });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const deletedAt = {
    deleted_at: new Date().toISOString(),
  };
  try {
    const deletedPerson = await Clinic.query().patchAndFetchById(id, deletedAt);
    res.json({
      message: deletedPerson
        ? `Record with ID ${id} has been deleted`
        : `Record with ID ${id} not found.`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
