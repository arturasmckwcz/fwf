const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const ParameterType = new GraphQLObjectType({
  name: 'ParemeterType',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    description: { type: GraphQLString },
    mesurement: { type: GraphQLString },
  }),
})

module.exports = ParameterType
