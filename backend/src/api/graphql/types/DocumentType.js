const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const tablenames = require('../../../constants/tablenames')

const {
  Product,
  Clinic,
  Lysate,
  Patient,
  Prescription,
  Source,
  Production,
  Dose,
  Filesystem,
} = require('../../../model')

const FilesystemType = require('./FilesystemType')
const PatientType = require('./PatientType')
const SourceType = require('./SourceType')
const PrescriptionType = require('./PrescriptionType')
const ProductionType = require('./ProductionType')
const ClinicType = require('./ClinicType')
const LysateType = require('./LysateType')
const ProductType = require('./ProductType')
const DoseType = require('./DoseType')

const DocumentType = new GraphQLObjectType({
  name: 'DocumentType',
  fields: () => ({
    id: { type: GraphQLID },
    file: {
      type: FilesystemType,
      async resolve(parent, args) {
        try {
          return await Filesystem.query()
            .where('deleted_at', null)
            .findById(parent.filesystem_id)
        } catch (error) {
          return { error }
        }
      },
    },
    table_id: { type: GraphQLString },
    patient: {
      type: PatientType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.patient)
          try {
            return await Patient.query()
              .where('deleted_at', null)
              .findById([parent.patient_id, tablenames.patient])
          } catch (error) {
            return { error }
          }
      },
    },
    source: {
      type: SourceType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.source)
          try {
            return await Source.query()
              .where('deleted_at', null)
              .findById([parent.source_id, tablenames.source])
          } catch (error) {
            return { error }
          }
      },
    },
    prescription: {
      type: PrescriptionType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.prescription)
          try {
            return await Prescription.query()
              .where('deleted_at', null)
              .findById([parent.prescription_id, tablenames.prescription])
          } catch (error) {
            return { error }
          }
      },
    },
    production: {
      type: ProductionType,
      async resolver(parent, args) {
        if (parent.table_id === tablenames.production)
          try {
            return await Production.query()
              .where('deleted_at', null)
              .findById([parent.production_id, tablenames.production])
          } catch (error) {
            return { error }
          }
      },
    },
    clinic: {
      type: ClinicType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.clinic)
          try {
            return await Clinic.query()
              .where('deleted_at', null)
              .findById([parent.clinic_id, tablenames.clinic])
          } catch (error) {
            return { error }
          }
      },
    },
    lysate: {
      type: LysateType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.lysate)
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
        if (parent.table_id === tablenames.product)
          try {
            return await Product.query()
              .where('deleted_at', null)
              .findById([parent.product_id, tablenames.product])
          } catch (error) {
            return { error }
          }
      },
    },
    dose: {
      type: DoseType,
      async resolve(parent, args) {
        if (parent.table_id === tablenames.dose)
          try {
            return await Dose.query()
              .where('deleted_at', null)
              .findById([parent.dose_id, tablenames.dose])
          } catch (error) {
            return { error }
          }
      },
    },
  }),
})

module.exports = DocumentType
