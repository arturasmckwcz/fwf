const { Model } = require('objection');
const tablenames = require('../../../db/constants/tablenames');
const schema = require('./productions.schema.json');

class Lysate extends Model {
  static get tableName() {
    return tablenames.production;
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Lysate;