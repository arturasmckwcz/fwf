const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const { Person } = require('../../../model')
const PersonType = require('./PersonType')

const LysateType = new GraphQLObjectType({
  name: 'LysateType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
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
  }),
})

module.exports = LysateType
