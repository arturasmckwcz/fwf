const tablenames = require('../constants/tablenames')

const patients = require('../constants/patients')
const lysates = require('../constants/lysates')
const params = require('../constants/params')
const locations = require('../constants/locations')

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
  try {
    await knex(tablenames.location).insert(locations)
  } catch (error) {
    console.log(locations)
    console.log(error)
  }

  // Seed clinics
  const clinics = await knex(tablenames.clinic)
    .insert([
      { name: 'Innovita research' },
      { name: 'InMedica' },
      { name: 'Klaipėdos universitetinė ligoninė' },
      { name: 'LSMU Kauno klinikos' },
      { name: 'Santaros klinikų vaikų ligoninė' },
      { name: 'Immucura' },
      { name: 'Verita Life' },
      { name: 'Verita Life Center Hamburg' },
      { name: 'GK klinika' },
      { name: 'I. Kelbauskienės klinika' },
      { name: 'Fakultni nemocnice v Motole' },
      { name: 'Viroterapijas & Integrativas medicinas klinika' },
      { name: 'Amber life' },
      { name: 'Integracinės onkologijos sveikatinimo priemonės' },
    ])
    .returning(['id', 'name'])

  const doctors = [
    { first: 'Irena', last: 'Pavilonienė', clinic: 'Innovita research' },
    {
      first: 'Rugilė',
      last: 'Pikturnienė',
      clinic: 'Klaipėdos universitetinė ligoninė',
    },
    { first: 'Eduardas', last: 'Aleknavičius', clinic: 'GK klinika' },
    { first: 'Abdulla', last: 'El-Hossami', clinic: 'Verita Life' },
    { first: 'Marius', last: 'Strioga', clinic: 'InMedica' },
    { first: 'Ladislav', last: 'Kelbl', clinic: 'Fakultni nemocnice v Motole' },
    { first: 'Pavol', last: 'Demo', clinic: 'Fakultni nemocnice v Motole' },
    { first: 'Asad', last: 'Saad', clinic: 'Verita Life Center Hamburg' },
    {
      first: 'Sonata',
      last: 'Šaulytė-Trakymienė',
      clinic: 'Santaros klinikų vaikų ligoninė',
    },
    { first: 'Giedrė', last: 'Rutkauskienė', clinic: 'LSMU Kauno klinikos' },
    { first: 'Inta', last: 'Jaunalksne', clinic: 'Amber life' },
    { first: 'Adem', last: 'Gunes', clinic: 'Amber life' },
    {
      first: 'František',
      last: 'Rolinek',
      clinic: 'Fakultni nemocnice v Motole',
    },
    {
      first: 'Jaroslav',
      last: 'Michalek',
      clinic: 'Fakultni nemocnice v Motole',
    },
    { first: 'Guna', last: 'Proboka', clinic: 'Amber life' },
    { first: 'Linda', last: 'Brokane', clinic: 'Amber life' },
    { first: 'Jiri', last: 'Prochazka', clinic: 'Fakultni nemocnice v Motole' },
    {
      first: 'Dainora',
      last: 'Mačiulienė',
      clinic: 'Integracinės onkologijos sveikatinimo priemonės',
    },
  ]

  // Seed doctors and combine with clinics
  for (let item of doctors) {
    let person_id = parseInt(
      await knex(tablenames.person)
        .insert({ first: item.first, last: item.last })
        .returning('id')
    )
    const clinic_id = parseInt(
      clinics[clinics.findIndex(clinic => clinic.name === item.clinic)].id
    )
    await knex(tablenames.doctor).insert({ person_id, clinic_id })
  }

  //Seed persons and patients from csv
  for (let { first, last, code } of patients) {
    const person_id = parseInt(
      await knex(tablenames.person)
        .insert({
          first,
          last,
        })
        .returning('id')
    )
    await knex(tablenames.patient).insert({
      person_id,
      code,
    })
  }

  // Seed products
  const products = await knex(tablenames.product)
    .insert([
      { name: 'DLP', description: 'Dendritic cells vaccine' },
      { name: 'CIK', description: 'Citokyne induced killers' },
      { name: 'SVF', description: 'Stoma vascular fraction' },
      { name: 'TCV', description: 'T-cells vaccine' },
      { name: 'MSC', description: 'Mesenchymal stem cells' },
    ])
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
}
