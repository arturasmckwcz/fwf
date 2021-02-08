const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./productions.schema.json')

class Production extends Model {
  static get tableName() {
    return tablenames.production
  }
  static get relationMappings() {
    const Prescription = require('../prescriptions/prescriptions.model')
    const Blood = require('../blood/blood.model')
    return {
      prescription: {
        realtion: Model.BelongsToOneRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.production}.${tablenames.prescription}_id`,
          to: `${tablenames.prescription}.id`,
        },
      },
      blood: {
        relation: Model.BelongsToOneRelation,
        modelClass: Blood,
        join: {
          from: `${tablenames.production}.${tablenames.blood}_id`,
          to: `${tablenames.blood}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Production
