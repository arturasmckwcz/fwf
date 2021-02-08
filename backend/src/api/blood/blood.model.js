const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./blood.schema.json')

console.log('src/api/blood/blood.model.js')

class Blood extends Model {
  static get tableName() {
    return tablenames.blood
  }
  static get relationMappings() {
    const Production = require('./../productions/productions.model')
    const Person = require('../persons/persons.model')
    const Clinic = require('../clinics/clinics.model')
    return {
      prescriptions: {
        relation: Model.HasManyRelation,
        modelClass: Production,
        join: {
          from: `${tablenames.blood}.id`,
          to: `${tablenames.production}.${tablenames.blood}_id`,
        },
      },
      person: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tablenames.blood}.${tablenames.person}_id`,
          to: `${tablenames.person}.id`,
        },
      },
      clinic: {
        relation: Model.BelongsToOneRelation,
        modelClass: Clinic,
        join: {
          from: `${tablenames.blood}.${tablenames.clinic}_id`,
          to: `${tablenames.clinic}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Blood
