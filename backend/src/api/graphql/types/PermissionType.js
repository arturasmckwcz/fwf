const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const PermissionType = new GraphQLObjectType({
  name: 'PermissionType',
  fields: () => ({
    id: { type: GraphQLID },
    relation: { type: GraphQLString },
    permission: { type: GraphQLString },
  }),
})

module.exports = PermissionType
