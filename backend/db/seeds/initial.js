const tablenames = require('../constants/tablenames')
const { permissions } = require('../constants/enums')
const { matchName } = require('../helpers')

const patients = require('../constants/patients')
const lysates = require('../constants/lysates')
const params = require('../constants/params')
const locations = require('../constants/locations')
const clinicsJSON = require('../constants/clinics.json')
const doctorsJSON = require('../constants/doctors.json')
const productsJSON = require('../constants/products.json')

/**
 *
 * @param {require('knex')} knex
 */

exports.seed = async knex => {
  // Deletes ALL existing entries
  await Promise.all(
    // eslint-disable-next-line camelcase
    Object.values(tablenames)
      .reverse()
      .map(table_name => knex(table_name).del())
  )

  // seed locations
  await knex(tablenames.location).insert(locations)

  // Seed clinics
  const clinics = await knex(tablenames.clinic)
    .insert(clinicsJSON)
    .returning(['id', 'name'])

  // Seed doctors and combine with clinics
  for (let item of doctorsJSON) {
    const person_id = parseInt(
      await knex(tablenames.person)
        .insert({ first: item.first, last: item.last })
        .returning('id')
    )
    const clinic_id =
      clinics[clinics.findIndex(clinic => matchName(clinic.name, item.clinic))]
        ?.id

    await knex(tablenames.doctor).insert({
      person_id,
      clinic_id: clinic_id ? parseInt(clinic_id) : undefined,
    })
  }

  //Seed persons and patients from csv
  for (let { first, last, code, status, clinic } of patients) {
    const person_id = parseInt(
      await knex(tablenames.person)
        .insert({
          first,
          last,
        })
        .returning('id')
    )
    const clinic_id =
      clinics[clinics.findIndex(item => matchName(clinic, item.name, 0.4))]?.id

    await knex(tablenames.patient).insert({
      person_id,
      code,
      status: status === 'O' || status === 'X' ? status : 'undefined',
      clinic_id: clinic_id ? parseInt(clinic_id) : undefined,
    })
  }

  // Seed products
  const products = await knex(tablenames.product)
    .insert(productsJSON)
    .returning(['id', 'name'])

  // Seed parameters from csv and scientific sets of params per product
  for (let { code, description, mesurement, dlp, cik, svf } of params) {
    const parameter_id = parseInt(
      await knex(tablenames.parameter)
        .insert({ code, description, mesurement })
        .returning('id')
    )
    if (dlp === '+')
      await knex(tablenames.science).insert({
        parameter_id,
        product_id: parseInt(
          products[products.findIndex(product => product.name === 'DLP')].id
        ),
      })
    if (cik === '+')
      await knex(tablenames.science).insert({
        parameter_id,
        product_id: parseInt(
          products[products.findIndex(product => product.name === 'CIK')].id
        ),
      })
    if (svf === '+')
      await knex(tablenames.science).insert({
        parameter_id,
        product_id: parseInt(
          products[products.findIndex(product => product.name === 'SVF')].id
        ),
      })
  }

  // Seed lysates from csv
  await knex(tablenames.lysate).insert(lysates)

  // Seed permissions
  const records = []
  for (let tablename of Object.values(tablenames)) {
    for (let permission of permissions) {
      records.push({ relation: tablename, permission })
    }
  }
  await knex(tablenames.permission).insert(records)
}
