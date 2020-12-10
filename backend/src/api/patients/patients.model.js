const { Model } = require('objection');
const tablenames = require('../../../constants/tablenames');
const schema = require('./patients.schema.json');

const Prescription = require('../prescriptions/prescriptions.model');

class Patient extends Model {
  static get tableName() {
    return tablenames.patient;
  }
  static get relationMappings() {
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.patient}.id`,
          to: `${tablenames.prescription}.${tablenames.patient}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Patient;