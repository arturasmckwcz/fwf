const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./productions.schema.json')

class Production extends Model {
  static get tableName() {
    return tablenames.production
  }

  static get idColumn() {
    return ['id', 'table_id']
  }

  static get relationMappings() {
    const Prescription = require('../prescriptions/prescriptions.model')
    const Source = require('../source/source.model')
    const Clinic = require('../clinics/clinics.model')
    return {
      prescription: {
        realtion: Model.BelongsToOneRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.production}.${tablenames.prescription}_id`,
          to: `${tablenames.prescription}.id`,
        },
      },
      source: {
        relation: Model.BelongsToOneRelation,
        modelClass: Source,
        join: {
          from: `${tablenames.production}.${tablenames.source}_id`,
          to: `${tablenames.source}.id`,
        },
      },
      clinic: {
        relation: Model.BelongsToOneRelation,
        modelClass: Clinic,
        join: {
          from: `${tablenames.production}.${tablenames.clinic}_id`,
          to: `${tablenames.clinic}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Production
