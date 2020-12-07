const { Model } = require('objection');
const tablenames = require('../../../constants/tablenames');
const schema = require('./lysates.schema.json');

const Prescription = require('./../prescriptions/prescriptions.model');

class Lysate extends Model {
  static get tableName() {
    return tablenames.lysate;
  }
  static get relationMappings() {
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tableNames.lysate}.id`,
          to: `${tableNames.prescription}.${tableNames.lysate}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Lysate;