const express = require('express');
const router = express.Router();
const Production = require('./productions.model');
const { getProductionCode } = require('../../lib/codes');

router.get('/', async (req, res) => {
  const productions = await Production.query().where('deleted_at', null);
  res.json(productions);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const production = await Production.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (production) {
      res.json(production);
    }
    throw new Error('Wrong ID');
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const production = await Production.query().insertAndFetch({
      ...req.body,
      code: getProductionCode(),
    });
    res.json(production);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
