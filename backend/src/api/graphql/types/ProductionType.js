const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
} = require('graphql')

const tablenames = require('../../../constants/tablenames')

const { Clinic, Prescription, Source } = require('../../model')

const ClinicType = request('./ClinicType')
const SourceType = request('./SourceType')
const PrescriptionType = request('./PrescriptionType')

const ProductionType = new GraphQLObjectType({
  name: 'ProductionType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    code: { type: GraphQLString },
    start_date: { type: GraphQLString },
    finish_date: { type: GraphQLString },
    expire_date: { type: GraphQLString },
    certified: { type: GraphQLBoolean },
    prescription: {
      type: PrescriptionType,
      async resolve(parent, args) {
        try {
          return await Prescription.query()
            .where('deleted_at', null)
            .findById([parent.prescription_id, tablenames.prescription])
        } catch (error) {
          return { error }
        }
      },
    },
    source: {
      type: SourceType,
      async resolve(parent, args) {
        try {
          return await Source.query()
            .where('deleted_at', null)
            .findById([parent.source_id, tablenames.source])
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

module.exports = ProductionType
