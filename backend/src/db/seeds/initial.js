const tablenames = require('../../constants/tablenames')
const { permissions } = require('../../constants/enums')

const patients = require('../sources/patients')
const lysates = require('../sources/lysates')
const params = require('../sources/params')
const locations = require('../sources/locations')
const clinicsJSON = require('../sources/clinics.json')
const doctorsJSON = require('../sources/doctors.json')
const productsJSON = require('../sources/products.json')

const matchName = require('../../../src/lib/matchNames')
const convertArr = require('../../../src/lib/arrayconvert')

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
    const clinic =
      clinics[clinics.findIndex(clnc => matchName(clnc.name, item.clinic))]

    await knex(tablenames.doctor).insert({
      person_id,
      clinic_id: clinic ? parseInt(clinic.id) : undefined,
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
  const permissionRecords = []
  for (let tablename of Object.values(tablenames)) {
    for (let permission of permissions) {
      permissionRecords.push({ relation: tablename, permission })
    }
  }
  const allPermissions = await knex(tablenames.permission)
    .insert(permissionRecords)
    .returning(['id', 'relation', 'permission'])

  // seed admin role
  const adminRole = parseInt(
    await knex(tablenames.role)
      .insert({
        description: 'FWF Administrator',
      })
      .returning('id')
  )
  const adminRights = []
  for (let permission of allPermissions) {
    adminRights.push({
      role_id: adminRole,
      permission_id: parseInt(permission.id),
    })
  }
  await knex(tablenames.right).insert(adminRights)

  const bcrypt = require('bcrypt')
  const saltRounds = 10

  // seed admin user
  const adminPerson = await knex(tablenames.person)
    .insert({
      first: 'Arturas',
      last: 'Mickiewicz',
      gender: 'male',
      age: 56,
      email: 'arturasmckwcz@gmail.com',
    })
    .returning('id')
  const adminUser = await knex(tablenames.user)
    .insert({
      username: 'arturas',
      password: await bcrypt.hash('froceth0', saltRounds),
      person_id: parseInt(adminPerson),
    })
    .returning('id')
  await knex(tablenames.member).insert({
    user_id: parseInt(adminUser),
    role_id: parseInt(adminRole),
  })

  // seed receptionist role
  const receptionistRole = parseInt(
    await knex(tablenames.role)
      .insert({
        description: 'Receptionist',
      })
      .returning('id')
  )
  const receptionistReadOnlyTables = [
    tablenames.product,
    tablenames.source,
    tablenames.lysate,
    tablenames.doctor,
    tablenames.clinic,
    tablenames.prescription,
    tablenames.source,
    tablenames.production,
  ]
  const receptionistCreateReadUpdateTables = [
    tablenames.person,
    tablenames.patient,
    tablenames.filesystem,
    tablenames.document,
  ]

  // convert arr of strings to arr of objs
  const permissionObjs = convertArr(permissions)

  const receptionistPermissions = [
    ...allPermissions.filter(
      permission =>
        receptionistReadOnlyTables.includes(permission.relation) &&
        permission.permission === permissionObjs.read
    ),
    ...allPermissions.filter(
      permission =>
        receptionistCreateReadUpdateTables.includes(permission.relation) &&
        permission.permission !== permissionObjs.delete
    ),
  ]
  const receptionistRights = []
  for (let permission of receptionistPermissions) {
    receptionistRights.push({
      role_id: receptionistRole,
      permission_id: parseInt(permission.id),
    })
  }
  await knex(tablenames.right).insert(receptionistRights)

  // seed receptionist user
  const receptionistPerson = await knex(tablenames.person)
    .insert({
      first: 'Simona',
      last: 'Janušauskienė',
      gender: 'female',
      age: 40,
      email: 'simona@froceth.lt',
    })
    .returning('id')
  const receptionistUser = await knex(tablenames.user)
    .insert({
      username: 'simona',
      password: await bcrypt.hash('froceth0', saltRounds),
      person_id: parseInt(receptionistPerson),
    })
    .returning('id')
  await knex(tablenames.member).insert({
    user_id: parseInt(receptionistUser),
    role_id: parseInt(receptionistRole),
  })
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
    const clinicToMatch =
      clinics[clinics.findIndex(item => matchName(clinic, item.name, 0.4))]
    

    await knex(tablenames.patient).insert({
      person_id,
      code,
      status: status === 'O' || status === 'X' ? status : 'undefined',
      clinic_id: clinicToMatch ? parseInt(clinicToMatch.id) : undefined,
      user_id: parseInt(adminUser),
    })
  }
}
