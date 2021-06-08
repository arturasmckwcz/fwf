const { Model } = require('objection')
const tablenames = require('../../constants/tablenames')
const schema = require('./doctors.schema.json')

class Doctor extends Model {
  static get tableName() {
    return tablenames.doctor
  }
  static get relationMappings() {
    const Prescription = require('../prescriptions/prescriptions.model')
    const Person = require('../persons/persons.model')
    const Clinic = require('../clinics/clinics.model')
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.doctor}.id`,
          to: `${tablenames.prescription}.${tablenames.doctor}_id`,
        },
      },
      person: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tablenames.doctor}.${tablenames.person}_id`,
          to: `${tablenames.person}.id`,
        },
      },
      clinic: {
        relation: Model.BelongsToOneRelation,
        modelClass: Clinic,
        join: {
          from: `${tablenames.doctor}.${tablenames.clinic}_id`,
          to: `${tablenames.clinic}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Doctor
