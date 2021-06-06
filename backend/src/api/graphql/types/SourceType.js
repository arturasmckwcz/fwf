const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const tablenames = require('../../../constants/tablenames')

const { Person, Clinic } = require('../../model')

const PersonType = require('./PersonType')
const ClinicType = require('./ClinicType')

const SourceType = new GraphQLObjectType({
  name: 'SourceType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    code: { type: GraphQLString },
    type: { type: GraphQLString },
    draw_date: { type: GraphQLString },
    arrive_date: { type: GraphQLString },
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
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        try {
          return await Clinic.query()
            .where('deleted_at', null)
            .findById([parent.clinic_id, tablenames.clinic])
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

module.exports = SourceType
