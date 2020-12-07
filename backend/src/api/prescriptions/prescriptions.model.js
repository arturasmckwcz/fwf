const { Model } = require('objection');
const tablenames = require('../../../constants/tablenames');
const schema = require('./prescriptions.schema.json');

const Production = require('./../productions/productions.model');

class Prescription extends Model {
  static get tableName() {
    return tablenames.prescription;
  }
  static get relationMappings() {
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Production,
        join: {
          from: `${tableNames.prescription}.id`,
          to: `${tableNames.production}.${tableNames.prescription}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Prescription;