const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const { notFound, errorHandler } = require('./middlewares')
const cors = require('cors')

const apiRouter = require('./api/api')

const app = express()

// TODO: figure out a better way to get Objection connected to knex
// TODO: no error if there's no connection to db
const db = require('./db') // For Objection Model connection to knex

app.use(cors())
app.options('*', cors())

app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(express.json())

app.use('/api', apiRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'FWF',
  })
})

app.use(notFound)
app.use(errorHandler)

module.exports = app
