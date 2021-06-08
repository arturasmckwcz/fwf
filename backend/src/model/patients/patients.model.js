const { Model } = require('objection')
const tablenames = require('../../constants/tablenames')
const schema = require('./patients.schema.json')

class Patient extends Model {
  static get tableName() {
    return tablenames.patient
  }

  static get idColumn() {
    return ['id', 'table_id']
  }

  static get relationMappings() {
    const Prescription = require('../prescriptions/prescriptions.model')
    const Person = require('../persons/persons.model')
    const Clinic = require('../clinics/clinics.model')
    return {
      prescriptions: {
        relation: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.patient}.id`,
          to: `${tablenames.prescription}.${tablenames.patient}_id`,
        },
      },
      person: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tablenames.patient}.${tablenames.person}_id`,
          to: `${tablenames.person}.id`,
        },
      },
      clinic: {
        relation: Model.BelongsToOneRelation,
        modelClass: Clinic,
        join: {
          from: `${tablenames.patient}.${tablenames.clinic}_id`,
          to: `${tablenames.clinic}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Patient
