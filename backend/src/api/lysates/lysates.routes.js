const express = require('express')
const { getLysateCode } = require('../../lib/codes')
const router = express.Router()
const tablenames = require('../../../db/constants/tablenames')
const Lysate = require('./lysates.model')
// const lysateFields = ['id', 'name', 'code', 'person_id']

router.get('/', async (req, res) => {
  const lysates = await Lysate.query()
    // .select(lysateFields)
    .where('deleted_at', null)
  res.json(lysates)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const lysate = await Lysate.query()
      // .select(lysateFields)
      .where('deleted_at', null)
      .findById([parseInt(id, 10) || 0, tablenames.lysate])

    res.json(lysate)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const lysate = await Lysate.query().insertAndFetch({
      ...req.body,
      code: getLysateCode(),
    })
    res.json(lysate)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  const { id } = req.body
  try {
    const lysate = await Lysate.query()
      .updateAndFetch({
        ...req.body,
        id: undefined,
      })
      .where({ id })
    res.json(lysate)
  } catch (error) {
    next(error)
  }
})

module.exports = router
