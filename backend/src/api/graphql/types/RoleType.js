const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql')

const { Right, Permission } = require('../../model')

const PermissionType = require('./PermissionType')

const RoleType = new GraphQLObjectType({
  name: 'RoleType',
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    permissions: {
      type: new GraphQLList(PermissionType),
      async resolve(parent, args) {
        const rights = await Right.query()
          .where('deleted_at', null)
          .where('role_id', parent.id)
        const permissions = []
        for (let right of rights)
          permissions.push(
            await Permission.query()
              .where('deleted_at', null)
              .findById(right.permission_id)
          )
        return permissions
      },
    },
  }),
})

module.exports = RoleType
