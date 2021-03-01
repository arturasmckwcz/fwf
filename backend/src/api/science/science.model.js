const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./science.schema.json')

class Science extends Model {
  static get tableName() {
    return tablenames.science
  }
  static get relationMappings() {
    const Data = require('../data/data.model')
    const Product = require('../products/products.model')
    const Parameter = require('../parameters/parameters.model')
    return {
      data: {
        relation: Model.HasManyRelation,
        modelClass: Data,
        join: {
          from: `${tablenames.science}.id`,
          to: `${tablenames.data}.${tablenames.science}_id`,
        },
      },
      product: {
        realation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: `${tablenames.science}.${tablenames.product}_id`,
          to: `${tablenames.product}.id`,
        },
      },
      parameter: {
        relation: Model.BelongsToOneRelation,
        modelClass: Parameter,
        join: {
          from: `${tablenames.science}.${tablenames.parameter}_id`,
          to: `${tablenames.parameter}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Science
