const express = require('express');
const router = express.Router();
const { getBloodCode } = require('../../lib/codes');
const Blood = require('./blood.model');

router.get('/', async (req, res) => {
  const blood = await Blood.query()
    .where('deleted_at', null);
  res.json(blood);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const blood = await Blood.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (blood) {
      return res.json(blood);
    }
    return next();
  } catch (error) {
    return next(error);
  };
});

router.post('/', async (req, res, next) => {
  try {
    const blood = await Blood.query()
      .insert({
        ... req.body,
      code: getBloodCode(),
      });
    res.json(blood);
  } catch (error) {
    next(error);
  }
});

module.exports = router;