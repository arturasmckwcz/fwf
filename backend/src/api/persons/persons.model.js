const { Model } = require('objection');
const tablenames = require('../../../db/constants/tablenames');
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
          from: `${tablenames.person}.id`,
          to: `${tablenames.doctor}.${tablenames.person}_id`,
        },
      },
      patients: {
        relation: Model.HasManyRelation,
        modelClass: Patient,
        join: {
          from: `${tablenames.person}.id`,
          to: `${tablenames.patient}.${tablenames.person}_id`,
        },
      },
      blood: {
        relation: Model.HasManyRelation,
        modelClass: Blood,
        join: {
          from: `${tablenames.person}.id`,
          to: `${tablenames.blood}.${tablenames.person}_id`,
        },
      },
      lysates: {
        relation: Model.HasManyRelation,
        modelClass: Lysate,
        join: {
          from: `${tablenames.person}.id`,
          to: `${tablenames.lysate}.${tablenames.person}_id`,
        },  
      },
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: `${tablenames.person}.id`,
          to: `${tablenames.user}.${tablenames.person}_id`,
        },
      },
    };
  }
  static get jsonSchema() {
      return schema;
  }
};

module.exports = Person;