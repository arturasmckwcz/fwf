const { Model } = require('objection')
const tablenames = require('../../../db/constants/tablenames')
const schema = require('./documents.schema.json')

// const Prescription = require('./../prescriptions/prescriptions.model');

class Doc extends Model {
  static get tableName() {
    return tablenames.document
  }
  // static get relationMappings() {
  //   return {
  //     prescritions: {
  //       relation: Model.HasManyRelation,
  //       modelClass: Prescription,
  //       join: {
  //         from: `${tablenames.product}.id`,
  //         to: `${tablenames.prescription}.${tablenames.product}_id`,
  //       },
  //     },
  //   }
  // }
  static get jsonSchema() {
    return schema
  }
}

module.exports = Doc
