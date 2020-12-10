const { Model } = require('objection');
const tablenames = require('../../../constants/tablenames');
const schema = require('./clinics.schema.json');

const Doctor = require('./../doctors/doctors.model');
const Patient = require('./../patients/patients.model');
const Blood = require('./../blood/blood.model');

class Clinic extends Model {
  static get tableName() {
    return tablenames.clinic;
  }
  static get relationMappings() {
    return {
      doctors: {
        relation: Model.HasManyRelation,
        modelClass: Doctor,
        join: {
          from: `${tablenames.clinic}.id`,
          to: `${tablenames.doctor}.${tablenames.clinic}_id`,
        },
      },
      patients: {
        relation: Model.HasManyRelation,
        modelClass: Patient,
        join: {
          from: `${tablenames.clinic}.id`,
          to: `${tablenames.patient}.${tablenames.clinic}_id`,
        },
      },
      blood: {
        relation: Model.HasManyRelation,
        modelClass: Blood,
        join: {
          from: `${tablenames.clinic}.id`,
          to: `${tablenames.blood}.${tablenames.clinic}_id`,
        },
      },
    };
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Clinic;