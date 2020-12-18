const { Model } = require('objection');
const tablenames = require('../../../db/constants/tablenames');
const schema = require('./roles.schema.json');

class Lysate extends Model {
  static get tableName() {
    return tablenames.role;
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Lysate;