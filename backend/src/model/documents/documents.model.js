const { Model } = require('objection')
const tablenames = require('../../constants/tablenames')
const schema = require('./documents.schema.json')

// const Prescription = require('./../prescriptions/prescriptions.model');

class Doc extends Model {
  static get tableName() {
    return tablenames.document
  }

  static get relationMappings() {
    const Filesystem = require('../filesystem/filesystem.model')
    const Patient = require('../patients/patients.model')
    const Source = require('../source/source.model')
    const Prescription = require('../prescriptions/prescriptions.model')
    const Production = require('../productions/productions.model')
    const Clinic = require('../clinics/clinics.model')
    const Lysate = require('../lysates/lysates.model')
    const Product = require('../products/products.model')
    const Dose = require('../doses/doses.model')

    return {
      filesystem: {
        realation: Model.BelongsToOneRelation,
        modelClass: Filesystem,
        join: {
          from: `${tablenames.document}.${tablenames.filesystem}_id`,
          to: `${tablenames.filesystem}.id`,
        },
      },
      patient: {
        realation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: [
            `${tablenames.document}.${tablenames.patient}_id`,
            `${tablenames.document}.table_id`,
          ],
          to: [`${tablenames.patient}.id`, `${tablenames.patient}.table_id`],
        },
      },
      source: {
        realation: Model.BelongsToOneRelation,
        modelClass: Source,
        join: {
          from: [
            `${tablenames.document}.${tablenames.source}_id`,
            `${tablenames.document}.table_id`,
          ],
          to: [`${tablenames.source}.id`, `${tablenames.source}.table_id`],
        },
      },
      prescription: {
        realation: Model.BelongsToOneRelation,
        modelClass: Prescription,
        join: {
          from: [
            `${tablenames.document}.${tablenames.prescription}_id`,
            `${tablenames.document}.table_id`,
          ],
          to: [
            `${tablenames.prescription}.id`,
            `${tablenames.prescription}.table_id`,
          ],
        },
      },
      production: {
        realation: Model.BelongsToOneRelation,
        modelClass: Production,
        join: {
          from: [
            `${tablenames.document}.${tablenames.production}_id`,
            `${tablenames.document}.table_id`,
          ],
          to: [
            `${tablenames.production}.id`,
            `${tablenames.production}.table_id`,
          ],
        },
      },
      clinic: {
        realation: Model.BelongsToOneRelation,
        modelClass: Clinic,
        join: {
          from: [
            `${tablenames.document}.${tablenames.clinic}_id`,
            `${tablenames.document}.table_id`,
          ],
          to: [`${tablenames.clinic}.id`, `${tablenames.clinic}.table_id`],
        },
      },
      lysate: {
        realation: Model.BelongsToOneRelation,
        modelClass: Lysate,
        join: {
          from: [
            `${tablenames.document}.${tablenames.lysate}_id`,
            `${tablenames.document}.table_id`,
          ],
          to: [`${tablenames.lysate}.id`, `${tablenames.lysate}.table_id`],
        },
      },
      product: {
        realation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: [
            `${tablenames.document}.${tablenames.product}_id`,
            `${tablenames.document}.table_id`,
          ],
          to: [`${tablenames.product}.id`, `${tablenames.product}.table_id`],
        },
      },
      dose: {
        realation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: [
            `${tablenames.document}.${tablenames.dose}_id`,
            `${tablenames.document}.table_id`,
          ],
          to: [`${tablenames.dose}.id`, `${tablenames.dose}.table_id`],
        },
      },
    }
  }

  static get jsonSchema() {
    return schema
  }
}

module.exports = Doc
