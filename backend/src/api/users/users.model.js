const { Model } = require('objection');
const tablenames = require('../../../constants/tablenames');
const schema = require('./users.schema.json');

class Lysate extends Model {
  static get tableName() {
    return tablenames.user;
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Lysate;