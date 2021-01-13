const express = require('express');
const router = express.Router();
const Product = require('./products.model');
const productFields = ['id', 'name'];

router.get('/', async (req, res) => {
  const products = await Product.query()
    .select(productFields)
    .where('deleted_at', null);
  res.json(products);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.query()
      .where('deleted_at', null)
      .select(productFields)
      .findById(parseInt(id, 10) || 0);
    if (product) {
      return res.json(product);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.query().insert(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { id } = req.body;
    await Product.query()
      .updateAndFetch({ ...req.body, id: undefined })
      .where({ id });
    res.json({ id });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.query()
      .updateAndFetch({ ...req.body, id: undefined })
      .where({ id });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.query().deleteById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
