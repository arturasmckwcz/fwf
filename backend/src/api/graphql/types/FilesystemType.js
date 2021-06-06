const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const FilesystemType = new GraphQLObjectType({
  name: 'FilesystemType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    body: { type: GraphQLString },
  }),
})

module.exports = FilesystemType
