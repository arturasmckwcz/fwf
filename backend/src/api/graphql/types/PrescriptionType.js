const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const tablenames = require('../../../constants/tablenames')

const { Product, Doctor, Lysate, Patient } = require('../../../model')

const ProductType = require('./ProductType')
const DoctorType = require('./DoctorType')
const LysateType = require('./LysateType')
const PatientType = require('./PatientType')

const PrescriptionType = new GraphQLObjectType({
  name: 'PrescriptionType',
  fields: () => ({
    id: { type: GraphQLID },
    table_id: { type: GraphQLString },
    code: { type: GraphQLString },
    blood_source: { type: GraphQLString },
    doctor: {
      type: DoctorType,
      async resolve(parent, args) {
        try {
          return await Doctor.query()
            .where('deleted_at', null)
            .findById(parent.doctor_id)
        } catch (error) {
          return { error }
        }
      },
    },
    patient: {
      type: PatientType,
      async resolve(parent, args) {
        try {
          return await Patient.query()
            .where('deleted_at', null)
            .findById([parent.patient_id, tablenames.patient])
        } catch (error) {
          return { error }
        }
      },
    },
    lysate: {
      type: LysateType,
      async resolve(parent, args) {
        try {
          return await Lysate.query()
            .where('deleted_at', null)
            .findById([parent.lysate_id, tablenames.lysate])
        } catch (error) {
          return { error }
        }
      },
    },
    product: {
      type: ProductType,
      async resolve(parent, args) {
        try {
          return await Product.query()
            .where('deleted_at', null)
            .findById([parent.product_id, tablenames.product])
        } catch (error) {
          return { error }
        }
      },
    },
  }),
})
module.exports = PrescriptionType
