const { Model } = require('objection');
const tablenames = require('../../../constants/tablenames');
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
          from: `${tableNames.blood}.id`,
          to: `${tableNames.production}.${tableNames.blood}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Blood;