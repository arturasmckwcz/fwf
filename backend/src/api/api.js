const express = require('express')
const router = express.Router()

const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql')

const { authCheck } = require('../middlewares')

router.use(authCheck)

router.use('/graphql', graphqlHTTP({ schema }))

router.get('/', (req, res) => {
  res.json({
    message: 'Go .../api/graphql for GraphQL end point',
  })
})

module.exports = router
