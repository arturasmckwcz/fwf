const { Model } = require('objection')
const tablenames = require('../../../constants/tablenames')
const schema = require('./permissions.schema.json')

const Right = require('../rights/rights.model')

class Permission extends Model {
  static get tableName() {
    return tablenames.permission
  }
  static get relationMappings() {
    return {
      rights: {
        relation: Model.HasManyRelation,
        modelClass: Right,
        join: {
          from: `${tablenames.permission}.id`,
          to: `${tablenames.right}.${tablenames.permission}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Permission
