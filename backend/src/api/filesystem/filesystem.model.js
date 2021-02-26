const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./filesystem.schema.json')

class Filesystem extends Model {
  static get tableName() {
    return tablenames.location
  }
  static get relationMappings() {
    const Document = require('../documents/documents.model')
    return {
      dose: Model.HasManyRelation,
      modelClass: Document,
      join: {
        from: `${tablenames.filesystem}.id`,
        to: `${tablenames.document}.${tablenames.filesystem}_id`,
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Filesystem
