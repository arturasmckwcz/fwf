const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./parameters.schema.json')

class Parameter extends Model {
  static get tableName() {
    return tablenames.parameter
  }
  static get relationMappings() {
    const Science = require('./../science/science.model')
    return {
      science: {
        relation: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.parameter}.id`,
          to: `${tablenames.science}.${tablenames.parameter}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Parameter
