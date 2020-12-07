const express = require('express');
const router = express.Router();
const queries = require('./products.queries')
const Prodct = require('./products.model');
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

module.exports = router;