const express = require('express')
const router = express.Router()
const { getSourceCode } = require('../../lib/codes')
const Source = require('./source.model')

router.get('/', async (req, res) => {
  const source = await Source.query().where('deleted_at', null)
  res.json(source)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const source = await Source.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0)
    if (source) {
      res.json(source)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const source = await Source.query().insertAndFetch({
      ...req.body,
      code: getSourceCode(),
    })
    res.json(source)
  } catch (error) {
    next(error)
  }
})

module.exports = router
