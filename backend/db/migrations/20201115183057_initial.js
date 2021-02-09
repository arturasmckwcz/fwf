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
  await knex.schema.createTable(tablenames.person, table => {
    table.increments().notNullable()
    table.string('first', 128).notNullable()
    table.string('last', 128).notNullable()
    table
      .enu('gender', ['male', 'female', 'undefined'])
      .defaultTo('undefined')
      .notNullable()
    table.integer('age').defaultTo(0).notNullable()
    table.string('code', 128)
    addContactInfo(table)
    addDefaultColumns(table)
    table.unique(['first', 'last', 'age', 'code', 'deleted_at'])
  })
  await knex.schema.createTable(tablenames.product, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.product)
    table.unique(['id', 'table_id'])
    table.string('name', 128).notNullable().unique()
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.clinic, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.clinic)
    table.unique(['id', 'table_id'])
    table.string('name', 128).notNullable().unique()
    table.string('web', 128).unique()
    addContactInfo(table)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.lysate, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.lysate)
    table.unique(['id', 'table_id'])
    table.string('name', 128).notNullable().unique()
    table.string('code', 128).notNullable().unique()
    addReference(table, tablenames.person, false)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.blood, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.blood)
    table.unique(['id', 'table_id'])
    table.dateTime('draw_date').notNullable()
    table.dateTime('arrive_date').notNullable()
    table.string('code', 128).notNullable().unique()
    addReference(table, tablenames.person)
    addReference(table, tablenames.clinic, false)
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
    table.string('table_id', 16).defaultTo(tablenames.patient)
    table.unique(['id', 'table_id'])
    addReference(table, tablenames.person)
    addReference(table, tablenames.clinic, false)
    table.string('code')
    table.enu('status', ['O', 'X', 'undefined']).defaultTo('undefined')
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.prescription, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.prescription)
    table.unique(['id', 'table_id'])
    table.string('code', 128).notNullable().unique()
    table.enu('blood_source', ['allogeneic', 'autologous']).notNullable()
    addReference(table, tablenames.doctor)
    addReference(table, tablenames.patient)
    addReference(table, tablenames.lysate)
    addReference(table, tablenames.product)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.production, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.production)
    table.unique(['id', 'table_id'])
    table.string('code', 128).notNullable().unique()
    addReference(table, tablenames.blood)
    addReference(table, tablenames.prescription)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.filesystem, table => {
    table.increments().notNullable()
    table.string('name', 128).notNullable().unique()
    table.enu('type', ['pdf', 'docx', 'adoc', 'xlsx']).defaultTo('pdf')
    table.specificType('body', 'bytea').notNullable()
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.document, table => {
    table.increments().notNullable()
    addReference(table, tablenames.filesystem)
    table.string('table_id', 16).notNullable()
    table.integer('product_id').unsigned()
    table
      .foreign(['product_id', 'table_id'])
      .references(['id', 'table_id'])
      .inTable(tablenames.product)
      .onDelete('CASCADE')
    table.integer('patient_id').unsigned()
    table
      .foreign(['patient_id', 'table_id'])
      .references(['id', 'table_id'])
      .inTable(tablenames.patient)
      .onDelete('CASCADE')
    table.integer('blood_id').unsigned()
    table
      .foreign(['blood_id', 'table_id'])
      .references(['id', 'table_id'])
      .inTable(tablenames.blood)
      .onDelete('CASCADE')
    table.integer('prescription_id').unsigned()
    table
      .foreign(['prescription_id', 'table_id'])
      .references(['id', 'table_id'])
      .inTable(tablenames.prescription)
      .onDelete('CASCADE')
    table.integer('production_id').unsigned()
    table
      .foreign(['production_id', 'table_id'])
      .references(['id', 'table_id'])
      .inTable(tablenames.production)
      .onDelete('CASCADE')
    table.integer('clinic_id').unsigned()
    table
      .foreign(['clinic_id', 'table_id'])
      .references(['id', 'table_id'])
      .inTable(tablenames.clinic)
      .onDelete('CASCADE')
    table.integer('lysate_id').unsigned()
    table
      .foreign(['lysate_id', 'table_id'])
      .references(['id', 'table_id'])
      .inTable(tablenames.lysate)
      .onDelete('CASCADE')
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.user, table => {
    table.increments().notNullable()
    table.string('username', 128).notNullable().unique()
    table.string('password', 128).notNullable().unique()
    addReference(table, tablenames.person)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.role, table => {
    table.increments().notNullable()
    table.string('name', 128).notNullable().unique()
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
