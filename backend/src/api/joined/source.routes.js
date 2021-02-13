const express = require('express')
const router = express.Router()
const Source = require('../source/source.model')
const Person = require('../persons/persons.model')
const { getSourceCode } = require('../../lib/codes')
const { getSource } = require('../../lib/getters')

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    res.json(await getSource(id))
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const person = await Person.query().insert({
      first: req.body.first,
      last: req.body.last,
      gender: req.body.gender ? req.body.gender : 'undefined',
      age: req.body.age ? req.body.age : 0,
      code: req.body.code ? req.body.code : undefined,
      email: req.body.email ? req.body.email : undefined,
      address: req.body.address ? req.body.address : undefined,
      phone: req.body.phone ? req.body.phone : undefined,
    })
    const source = await Source.query().insert({
      person_id: person.id,
      clinic_id: req.body.clinic_id ? req.body.clinic_id : undefined,
      code: getSourceCode(),
      draw_date: req.body.draw_date,
      arrive_date: new Date().toISOString(),
    })
    res.json(source)
  } catch (error) {
    next(error)
  }
})

module.exports = router
