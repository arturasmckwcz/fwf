const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./prescriptions.schema.json')

const Production = require('./../productions/productions.model')

class Prescription extends Model {
  static get tableName() {
    return tablenames.prescription
  }
  static get relationMappings() {
    const Doctor = require('../doctors/doctors.model')
    const Patient = require('../patients/patients.model')
    const Product = require('../products/products.model')
    const Lysate = require('../lysates/lysates.model')
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Production,
        join: {
          from: `${tablenames.prescription}.id`,
          to: `${tablenames.production}.${tablenames.prescription}_id`,
        },
      },
      doctor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Doctor,
        join: {
          from: `${tablenames.prescription}.${tablenames.doctor}_id`,
          to: `${tablenames.doctor}.id`,
        },
      },
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: `${tablenames.prescription}.${tablenames.patient}_id`,
          to: `${tablenames.patient}.id`,
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: `${tablenames.prescription}.${tablenames.product}_id`,
          to: `${tablenames.product}.id`,
        },
      },
      lysate: {
        relation: Model.BelongsToOneRelation,
        modelClass: Lysate,
        join: {
          from: `${tablenames.prescription}.${tablenames.lysate}_id`,
          to: `${tablenames.lysate}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Prescription
