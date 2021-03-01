const express = require('express')
const router = express.Router()
const queries = require('./patients.queries')
const Patient = require('./patients.model')
const tablenames = require('../../../db/constants/tablenames')

router.get('/', async (req, res) => {
  const patients = await Patient.query().where('deleted_at', null)
  res.json(patients)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const patient = await Patient.query()
      .where('deleted_at', null)
      .findById([parseInt(id, 10) || 0, tablenames.patient])
    if (patient) {
      res.json(patient)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
