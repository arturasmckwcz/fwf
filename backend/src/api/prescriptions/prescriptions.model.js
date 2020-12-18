const { Model } = require('objection');
const tablenames = require('../../../db/constants/tablenames');
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
          from: `${tablenames.prescription}.id`,
          to: `${tablenames.production}.${tablenames.prescription}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Prescription;