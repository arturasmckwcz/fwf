const { Model } = require('objection')
const tablenames = require('../../../constants/tablenames')
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
    const Data = require('../data/data.model')
    return {
      prescription: {
        realtion: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.production}.${tablenames.prescription}_id`,
          to: `${tablenames.prescription}.id`,
        },
      },
      source: {
        relation: Model.HasManyRelation,
        modelClass: Source,
        join: {
          from: `${tablenames.production}.${tablenames.source}_id`,
          to: `${tablenames.source}.id`,
        },
      },
      clinic: {
        relation: Model.HasManyRelation,
        modelClass: Clinic,
        join: {
          from: `${tablenames.production}.${tablenames.clinic}_id`,
          to: `${tablenames.clinic}.id`,
        },
      },
      data: {
        relation: Model.HasManyRelation,
        modelClass: Data,
        join: {
          from: `${tablenames.production}.${tablenames.data}_id`,
          to: `${tablenames.data}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Production
