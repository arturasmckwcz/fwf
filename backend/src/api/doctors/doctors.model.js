const { Model } = require('objection');
const tablenames = require('../../../constants/tablenames');
const schema = require('./doctors.schema.json');

const Prescription = require('./../prescriptions/prescriptions.model');

class Doctor extends Model {
  static get tableName() {
    return tablenames.doctor;
  }
  static get relationMappings() {
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tableNames.doctor}.id`,
          to: `${tableNames.prescription}.${tableNames.doctor}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Doctor;