const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./source.schema.json')

class Source extends Model {
  static get tableName() {
    return tablenames.source
  }
  static get relationMappings() {
    const Production = require('../productions/productions.model')
    const Person = require('../persons/persons.model')
    const Clinic = require('../clinics/clinics.model')
    return {
      prescriptions: {
        relation: Model.HasManyRelation,
        modelClass: Production,
        join: {
          from: `${tablenames.source}.id`,
          to: `${tablenames.production}.${tablenames.source}_id`,
        },
      },
      person: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tablenames.source}.${tablenames.person}_id`,
          to: `${tablenames.person}.id`,
        },
      },
      clinic: {
        relation: Model.BelongsToOneRelation,
        modelClass: Clinic,
        join: {
          from: `${tablenames.source}.${tablenames.clinic}_id`,
          to: `${tablenames.clinic}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Source
