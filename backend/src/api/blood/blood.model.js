const { Model } = require('objection');
const tablenames = require('../../../db/constants/tablenames');
const schema = require('./blood.schema.json');

const Production = require('./../productions/productions.model');

class Blood extends Model {
  static get tableName() {
    return tablenames.blood;
  }
  static get relationMappings() {
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Production,
        join: {
          from: `${tablenames.blood}.id`,
          to: `${tablenames.production}.${tablenames.blood}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Blood;