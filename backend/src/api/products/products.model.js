const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./products.schema.json')

class Product extends Model {
  static get tableName() {
    return tablenames.product
  }

  static get idColumn() {
    return ['id', 'table_id']
  }

  static get relationMappings() {
    const Prescription = require('./../prescriptions/prescriptions.model')
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.product}.id`,
          to: `${tablenames.prescription}.${tablenames.product}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Product
