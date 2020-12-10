const express = require('express');
const router = express.Router();
const { getPrescriptionCode } = require('../../lib/codes');
const Prescription = require('../prescriptions/prescriptions.model');
const Product = require('../products/products.model');
const Lysate = require('../lysates/lysates.model');
const { getPrescription } = require('../../lib/getters');

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    res.json(await getPrescription(id));
    } catch (error) {
    next(error);
  }
});

module.exports = router;