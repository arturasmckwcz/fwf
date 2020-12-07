const { Model } = require('objection');
const tablenames = require('../../../constants/tablenames');
const schema = require('./patients.schema.json');

class Patient extends Model {
  static get tableName() {
    return tablenames.patient;
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Patient;