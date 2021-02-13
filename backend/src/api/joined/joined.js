const express = require('express')
const router = express.Router()

const doctors = require('./doctors.routes')
const source = require('./source.routes')
const patients = require('./patients.routes')
const prescriptions = require('./prescriptions.routes')
const productions = require('./productions.routes')

router.use('/doctors', doctors)
router.use('/source', source)
router.use('/patients', patients)
router.use('/prescriptions', prescriptions)
router.use('/productions', productions)

router.get('/', (req, res) => {
  res.json({
    message: 'FWF API Joined Queries',
  })
})

module.exports = router
