const { GraphQLObjectType, GraphQLID } = require('graphql')

const tablenames = require('../../../constants/tablenames')

const { Person, Clinic } = require('../../../model')

const PersonType = require('./PersonType')
const ClinicType = require('./ClinicType')

const DoctorType = new GraphQLObjectType({
  name: 'DoctorType',
  fields: () => ({
    id: { type: GraphQLID },
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

module.exports = DoctorType
