/* eslint-disable camelcase */
const tablenames = require('../constants/tablenames')
const {
  addDefaultColumns,
  addContactInfo,
  addReference,
} = require('../helpers')

/**
 *
 * @param {require('knex')} knex
 */

exports.up = async knex => {
  await knex.schema.createTable(tablenames.document, table => {
    table.increments().notNullable()
    table.string('name', 127).notNullable()
    table.specificType('pdf', 'bytea').notNullable()
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.person, table => {
    table.increments().notNullable()
    table.string('first', 127).notNullable()
    table.string('last', 127).notNullable()
    table
      .enu('gender', ['male', 'female', 'undefined'])
      .defaultTo('undefined')
      .notNullable()
    table.integer('age').defaultTo(0).notNullable()
    table.string('code', 127)
    addContactInfo(table)
    addDefaultColumns(table)
    table.unique(['first', 'last', 'age', 'code', 'deleted_at'])
  })
  await knex.schema.createTable(tablenames.product, table => {
    table.increments().notNullable()
    table.string('name', 127).notNullable().unique()
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.clinic, table => {
    table.increments().notNullable()
    table.string('name', 127).notNullable().unique()
    table.string('web', 127).unique()
    addContactInfo(table)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.lysate, table => {
    table.increments().notNullable()
    table.string('name', 127).notNullable().unique()
    table.string('code', 127).notNullable().unique()
    addReference(table, tablenames.person, false)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.blood, table => {
    table.increments().notNullable()
    table.dateTime('draw_date').notNullable()
    table.dateTime('arrive_date').notNullable()
    table.string('code', 127).notNullable().unique()
    addReference(table, tablenames.person)
    addReference(table, tablenames.clinic, false)
    addReference(table, tablenames.document, false)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.doctor, table => {
    table.increments().notNullable()
    addReference(table, tablenames.person)
    addReference(table, tablenames.clinic, false)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.patient, table => {
    table.increments().notNullable()
    addReference(table, tablenames.person)
    addReference(table, tablenames.clinic, false)
    addReference(table, tablenames.document, false)
    table.string('code')
    table.enu('status', ['O', 'X', 'undefined']).defaultTo('undefined')
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.prescription, table => {
    table.increments().notNullable()
    table.string('code', 127).notNullable().unique()
    table.enu('blood_source', ['allogeneic', 'autologous']).notNullable()
    addReference(table, tablenames.doctor)
    addReference(table, tablenames.patient)
    addReference(table, tablenames.lysate)
    addReference(table, tablenames.product)
    addReference(table, tablenames.document, false)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.production, table => {
    table.increments().notNullable()
    table.string('code', 127).notNullable().unique()
    addReference(table, tablenames.blood)
    addReference(table, tablenames.prescription)
    addReference(table, tablenames.document, false)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.user, table => {
    table.increments().notNullable()
    table.string('username', 127).notNullable().unique()
    table.string('password', 127).notNullable().unique()
    addReference(table, tablenames.person)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.role, table => {
    table.increments().notNullable()
    table.string('name', 127).notNullable().unique()
    addReference(table, tablenames.user)
    addDefaultColumns(table)
  })
}

exports.down = async knex => {
  await Promise.all(
    Object.values(tablenames)
      .reverse()
      .map(tableName => knex.schema.dropTableIfExists(tableName))
  )
}
