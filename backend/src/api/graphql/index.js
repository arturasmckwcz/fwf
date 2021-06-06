const { GraphQLSchema } = require('graphql')

const query = require('./queries/query')
const mutation = require('./queries/mutation')

module.exports = new GraphQLSchema({ query, mutation })
