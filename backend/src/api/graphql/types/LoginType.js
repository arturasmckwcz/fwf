const { GraphQLObjectType, GraphQLString } = require('graphql')

const LoginType = new GraphQLObjectType({
  name: 'LoginType',
  fields: () => ({
    token: { type: GraphQLString },
  }),
})

module.exports = LoginType
