const { Model } = require('objection');
const tablenames = require('../../../db/constants/tablenames');
const schema = require('./users.schema.json');

const Role = require('../roles/roles.model');

class Lysate extends Model {
  static get tableName() {
    return tablenames.user;
  }
  static get relationMappings() {
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Role,
        join: {
          from: `${tablenames.user}.id`,
          to: `${tablenames.role}.${tablenames.user}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Lysate;