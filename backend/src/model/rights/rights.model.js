const { Model } = require('objection')
const tablenames = require('../../constants/tablenames')
const schema = require('./rights.schema.json')

const Permission = require('../permissions/permissions.model')
const Role = require('../roles/roles.model')

class Right extends Model {
  static get tableName() {
    return tablenames.right
  }
  static get relationMappings() {
    return {
      permission: {
        relation: Model.BelongsToOneRelation,
        modelClass: Permission,
        join: {
          from: `${tablenames.permission}.id`,
          to: `${tablenames.right}.${tablenames.permission}_id`,
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: `${tablenames.role}.id`,
          to: `${tablenames.right}.${tablenames.role}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Right
