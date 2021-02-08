const express = require('express')
const router = express.Router()
const Doc = require('./documents.model')

router.get('/', async (req, res, next) => {
  const documents = await Doc.query()
    .select('id', 'name')
    .where('deleted_at', null)
  res.json(documents)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const document = await Doc.query().where('deleted_at', null).findById(id)
  res.json(document)
})

router.post('/', async (req, res, next) => {
  const fs = require('fs')
  const name = '/home/arturas/fwf/backend/fwf_database.pdf'
  fs.readFile(name, async (error, pdf) => {
    if (error) {
      next(error)
    }
    try {
      const document = await Doc.query().insert({ name, pdf })
      res.json(document)
    } catch (error) {
      next(error)
    }
  })
})
module.exports = router
