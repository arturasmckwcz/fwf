const express = require('express');
const { getLysateCode } = require('../../lib/codes');
const router = express.Router();
const Lysate = require('./lysates.model');

router.get('/', async (req, res) => {
  const lysates = await Lysate.query()
    .where('deleted_at', null);
  res.json(lysates);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const lysate = await Lysate.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (lysate) {
      return res.json(lysate);
    }
    return next();
  } catch (error) {
    return next(error);
  };
});

router.post('/', async (req, res, next) => {
  try {
    const lysate = await Lysate.query()
      .insert({
        ... req.body,
        code: getLysateCode(),
      });
    res.json(lysate);
  } catch (error) {
    next(error);
  }
});

module.exports = router;