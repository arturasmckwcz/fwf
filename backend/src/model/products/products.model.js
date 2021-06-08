const { Model } = require('objection')
const tablenames = require('../../constants/tablenames')
const schema = require('./products.schema.json')

class Product extends Model {
  static get tableName() {
    return tablenames.product
  }

  static get idColumn() {
    return ['id', 'table_id']
  }

  static get relationMappings() {
    const Prescription = require('../prescriptions/prescriptions.model')
    const Science = require('../science/science.model')
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.product}.id`,
          to: `${tablenames.prescription}.${tablenames.product}_id`,
        },
      },
      science: {
        relation: Model.HasManyRelation,
        modelClass: Science,
        join: {
          from: `${tablenames.product}.id`,
          to: `${tablenames.science}.${tablenames.product}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Product
