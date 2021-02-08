const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const middlewares = require('./middlewares')
const cors = require('cors')

const apiRouter = require('./api/api')

const app = express()

const db = require('./db') //

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

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = app
