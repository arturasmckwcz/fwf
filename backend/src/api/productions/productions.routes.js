const express = require('express');
const router = express.Router();
const Production = require('./productions.model');

router.get('/', async (req, res) => {
  const productions = await Production.query()
    .where('deleted_at', null);
  res.json(productions);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const production = await Production.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (production) {
      return res.json(production);
    }
    return next();
  } catch (error) {
    return next(error);
  };
});

module.exports = router;