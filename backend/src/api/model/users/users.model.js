const { Model } = require('objection')
const tablenames = require('../../../constants/tablenames')
const schema = require('./users.schema.json')

const Member = require('../members/members.model')

class User extends Model {
  static get tableName() {
    return tablenames.user
  }
  static get relationMappings() {
    return {
      members: {
        relation: Model.HasManyRelation,
        modelClass: Menber,
        join: {
          from: `${tablenames.user}.id`,
          to: `${tablenames.member}.${tablenames.user}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = User
