const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require('graphql')

const PersonSearchType = new GraphQLObjectType({
  name: 'PersonSearch',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
})

module.exports = PersonSearchType
