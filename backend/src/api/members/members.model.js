const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./members.schema.json')

const User = require('../users/users.model')
const Role = require('../roles/roles.model')

class Member extends Model {
  static get tableName() {
    return tablenames.member
  }
  static get relationMappings() {
    return {
      permission: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${tablenames.permission}.id`,
          to: `${tablenames.member}.${tablenames.permission}_id`,
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: `${tablenames.role}.id`,
          to: `${tablenames.member}.${tablenames.role}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Member
