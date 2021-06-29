const express = require('express')
const router = express.Router()

const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql')

const { authCheck, loggerHeaders, loggerRequest } = require('../middlewares')

router.use(loggerHeaders)
router.use(loggerRequest)
router.use(authCheck)

router.use('/graphql', graphqlHTTP({ schema }))

router.get('/', (req, res) => {
  res.json({
    message: 'Go .../api/graphql for GraphQL end point',
  })
})

module.exports = router
