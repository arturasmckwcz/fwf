const express = require('express');
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

module.exports = router;