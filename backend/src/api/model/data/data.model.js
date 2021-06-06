const { Model } = require('objection')
const tablenames = require('../../../constants/tablenames')
const schema = require('./data.schema.json')

class Data extends Model {
  static get tableName() {
    return tablenames.data
  }
  static get relationMappings() {
    const Science = require('../science/science.model')
    const Production = require('../parameters/parameters.model')
    return {
      science: {
        realation: Model.BelongsToOneRelation,
        modelClass: Science,
        join: {
          from: `${tablenames.data}.${tablenames.science}_id`,
          to: `${tablenames.science}.id`,
        },
      },
      production: {
        relation: Model.BelongsToOneRelation,
        modelClass: Production,
        join: {
          from: `${tablenames.data}.${tablenames.production}_id`,
          to: `${tablenames.production}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Data
