const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const DocumentLookupType = new GraphQLObjectType({
  name: 'DocumentOwnerType',
  fields: () => ({
    filesystem_id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    owner: { type: GraphQLID },
  }),
})

module.exports = DocumentLookupType
