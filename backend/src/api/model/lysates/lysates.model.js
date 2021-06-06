const { Model } = require('objection')
const tablenames = require('../../../constants/tablenames')
const schema = require('./lysates.schema.json')

class Lysate extends Model {
  static get tableName() {
    return tablenames.lysate
  }

  static get idColumn() {
    return ['id', 'table_id']
  }

  static get relationMappings() {
    const Prescription = require('../prescriptions/prescriptions.model')
    const Person = require('../persons/persons.model')
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.lysate}.id`,
          to: `${tablenames.prescription}.${tablenames.lysate}_id`,
        },
      },
      person: {
        realation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: `${tablenames.lysate}.${tablenames.person}_id`,
          to: `${tablenames.person}.id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Lysate
