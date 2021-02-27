const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./doses.schema.json')

class Dose extends Model {
  static get tableName() {
    return tablenames.dose
  }
  static get relationMappings() {
    const Production = require('../productions/productions.model')
    const Location = require('../locations/locations.model')
    const Document = require('../documents/documents.model')
    return {
      document: {
        relation: Model.HasManyRelation,
        modelClass: Document,
        join: {
          from: `${tablenames.dose}.id`,
          to: `${tablenames.document}.${tablenames.dose}_id`,
        },
      },
      production: {
        realation: Model.BelongsToOneRelation,
        modelClass: Production,
        join: {
          from: `${tablenames.dose}.${tablenames.production}_id`,
          to: `${tablenames.production}.id`,
        },
      },
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: `${tablenames.dose}.${tablenames.location}_id`,
          to: `${tablenames.location}.id`,
        },
      },
    }
  }

  static get jsonSchema() {
    return schema
  }
}

module.exports = Dose
