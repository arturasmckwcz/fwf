const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

const tablenames = require('../../../constants/tablenames')

const { Person, Clinic } = require('../../../model')

const PersonType = require('./PersonType')
const ClinicType = require('./ClinicType')

const PatientType = new GraphQLObjectType({
  name: 'PatientType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
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
    code: { type: GraphQLString },
    status: { type: GraphQLString },
    created_at: { type: GraphQLDateTime },
  }),
})

module.exports = PatientType
