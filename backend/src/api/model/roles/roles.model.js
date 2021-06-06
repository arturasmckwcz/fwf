const { Model } = require('objection')
const tablenames = require('../../../constants/tablenames')
const schema = require('./roles.schema.json')

class Role extends Model {
  static get tableName() {
    return tablenames.role
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Role
