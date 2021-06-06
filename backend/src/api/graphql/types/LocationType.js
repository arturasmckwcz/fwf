const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
} = require('graphql')

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    id: { type: GraphQLID },
    container: { type: GraphQLString },
    handle: { type: GraphQLString },
    shelf: { type: GraphQLString },
    line: { type: GraphQLString },
    place: { type: GraphQLString },
    occupied: { type: GraphQLBoolean },
  }),
})

module.exports = LocationType
