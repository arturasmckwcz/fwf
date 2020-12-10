const { Model } = require('objection');
const tablenames = require('../../../constants/tablenames');
const schema = require('./products.schema.json');

const Prescription = require('./../prescriptions/prescriptions.model');

class Product extends Model {
  static get tableName() {
    return tablenames.product;
  }
  static get relationMappings() {
    return {
      prescritions: {
        relation: Model.HasManyRelation,
        modelClass: Prescription,
        join: {
          from: `${tablenames.product}.id`,
          to: `${tablenames.prescription}.${tablenames.product}_id`,
        },
      },
    }
  }
  static get jsonSchema() {
    return schema
  }
};

module.exports = Product;