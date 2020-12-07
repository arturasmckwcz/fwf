const { Model } = require('objection');
const tablenames = require('../../../constants/tablenames');
const schema = require('./persons.schema.json');

const Doctor = require('./../doctors/doctors.model');
const Patient = require('./../patients/patients.model');
const Blood = require('./../blood/blood.model');
const Lysate = require('./../lysates/lysates.model');
const User = require('./../users/users.model');

class Person extends Model {
  static get tableName() {
    return tablenames.person;
  }
  static get relationMappings() {
    return {
      doctors: {
        relation: Model.HasManyRelation,
        modelClass: Doctor,
        join: {
          from: `${tableNames.person}.id`,
          to: `${tableNames.doctor}.${tableNames.person}_id`,
        },
      },
      patients: {
        relation: Model.HasManyRelation,
        modelClass: Patient,
        join: {
          from: `${tableNames.person}.id`,
          to: `${tableNames.patient}.${tableNames.person}_id`,
        },
      },
      blood: {
        relation: Model.HasManyRelation,
        modelClass: Blood,
        join: {
          from: `${tableNames.person}.id`,
          to: `${tableNames.blood}.${tableNames.person}_id`,
        },
      },
      lysates: {
        relation: Model.HasManyRelation,
        modelClass: Lysate,
        join: {
          from: `${tableNames.person}.id`,
          to: `${tableNames.lysate}.${tableNames.person}_id`,
        },  
      },
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: `${tableNames.person}.id`,
          to: `${tableNames.user}.${tableNames.person}_id`,
        },
      },
    };
  }
  static get jsonSchema() {
      return schema;
  }
};

module.exports = Person;