const express = require('express');
const router = express.Router();
const Product = require('./products.model');

router.get('/', async (req, res) => {
  const products = await Product.query()
    .where('deleted_at', null);
  res.json(products);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (product) {
      return res.json(product);
    }
    return next();
  } catch (error) {
    return next(error);
  };
});

router.post('/', async (req, res, next) => {
try {
    const product = await Product.query()
      .insert(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  };
});

module.exports = router;