const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require('graphql')

const ClinicType = require('./ClinicType')
const { Clinic, Patient } = require('../../../model')

const tablenames = require('../../../constants/tablenames')

const PersonSearchType = new GraphQLObjectType({
  name: 'PersonSearch',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
    clinic: {
      type: GraphQLString,
      async resolve(parent, args) {
        try {
          const patient = await Patient.query()
            .where('deleted_at', null)
            .andWhere('person_id', parseInt(parent.id))
            .first()
          const clinic = await Clinic.query()
            .where('deleted_at', null)
            .findById([patient.clinic_id, tablenames.clinic])
          return clinic.name
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})

module.exports = PersonSearchType
