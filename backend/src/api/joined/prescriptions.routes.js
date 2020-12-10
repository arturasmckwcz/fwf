const express = require('express');
const router = express.Router();
const { getPrescriptionCode } = require('../../lib/codes');
const Prescription = require('../prescriptions/prescriptions.model');
const Product = require('../products/products.model');
const Lysate = require('../lysates/lysates.model');
const { getDoctor, getPatient } = require('../../lib/getters');

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const prescription = await Prescription.query()
      .where('deleted_at', null)
      .findById(id);
    const product = await Product.query()
      .where('deleted_at', null)
      .findById(prescription.product_id);
    const lysate = await Lysate.query()
      .where('deleted_at', null)
      .findById(prescription.lysate_id);
    res.json({
      code: prescription.code,
      blood_source: prescription.blood_source,
      lysate: `${lysate.code}: ${lysate.name}`,
      product: product.code,
      patient: await getPatient(prescription.patient_id),
      doctor: await getDoctor(prescription.doctor_id),
    });
    } catch (error) {
    next(error);
  }
});

module.exports = router;