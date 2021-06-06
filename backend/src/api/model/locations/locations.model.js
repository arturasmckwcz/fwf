const { Model } = require('objection')
const tablenames = require('../../../constants/tablenames')
const schema = require('./locations.schema.json')

class Location extends Model {
  static get tableName() {
    return tablenames.location
  }
  static get relationMappings() {
    const Dose = require('../doses/doses.model')
    return {
      dose: Model.HasManyRelation,
      modelClass: Dose,
      join: {
        from: `${tablenames.location}.id`,
        to: `${tablenames.production}.${tablenames.location}_id`,
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Location
