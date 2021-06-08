const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql')

const { Person, Role, Member } = require('../../../model')

const PersonType = require('./PersonType')
const RoleType = require('./RoleType')

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    person: {
      type: PersonType,
      async resolve(parent, args) {
        try {
          return await Person.query()
            .where('deleted_at', null)
            .findById(parent.person_id)
        } catch (error) {
          return { error }
        }
      },
    },
    roles: {
      type: new GraphQLList(RoleType),
      async resolve(parent, args) {
        const memberships = await Member.query()
          .where('deleted_at', null)
          .where('user_id', parent.id)
        const roles = []
        for (let membership of memberships)
          roles.push(
            await Role.query()
              .where('deleted_at', null)
              .findById(membership.role_id)
          )
        return roles
      },
    },
  }),
})

module.exports = UserType
