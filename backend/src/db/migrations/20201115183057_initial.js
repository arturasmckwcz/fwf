/* eslint-disable camelcase */
const tablenames = require('../constants/tablenames')
const enums = require('../constants/enums')
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
    table.enu('gender', enums.genders).defaultTo('undefined').notNullable()
    table.integer('age').defaultTo(0).notNullable()
    addContactInfo(table)
    addDefaultColumns(table)
    table.unique(['first', 'last', 'age', 'deleted_at'])
  })
  await knex.schema.createTable(tablenames.product, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.product)
    table.unique(['id', 'table_id'])
    table.string('name', 16).notNullable().unique()
    table.string('description', 128)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.parameter, table => {
    table.increments().notNullable()
    table.string('code', 32).notNullable().unique()
    table.string('description', 128)
    table.string('mesurement', 16)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.location, table => {
    table.increments().notNullable()
    table.string('container', 16).notNullable()
    table.string('handle', 16).notNullable()
    table.string('shelf', 16).notNullable()
    table.string('line', 16).notNullable()
    table.string('place', 16).notNullable()
    table.unique(['container', 'handle', 'shelf', 'place', 'deleted_at'])
    table.boolean('occupied').notNullable().defaultTo(false)
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
  await knex.schema.createTable(tablenames.source, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.source)
    table.unique(['id', 'table_id'])
    table.dateTime('draw_date').notNullable()
    table.dateTime('arrive_date').notNullable()
    table.string('code', 32).notNullable().unique()
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
    table.enu('status', enums.patient_statuses).defaultTo('undefined')
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.prescription, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.prescription)
    table.unique(['id', 'table_id'])
    table.string('code', 32).notNullable().unique()
    table
      .enu('blood_source', enums.sources)
      .defaultTo('undefined')
      .notNullable()
    table.dateTime('issue_date')
    addReference(table, tablenames.doctor)
    addReference(table, tablenames.patient)
    addReference(table, tablenames.lysate)
    addReference(table, tablenames.product)
    addReference(table, tablenames.source)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.production, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.production)
    table.unique(['id', 'table_id'])
    table.string('code', 32).notNullable().unique()
    table.dateTime('start_date')
    table.dateTime('finish_date')
    table.dateTime('expire_date')
    addReference(table, tablenames.source)
    addReference(table, tablenames.prescription)
    addReference(table, tablenames.clinic)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.dose, table => {
    table.increments().notNullable()
    table.string('table_id', 16).defaultTo(tablenames.dose)
    table.unique(['id', 'table_id'])
    table.string('code', 32).notNullable().unique()
    table.enu('status', enums.dose_statuses).notNullable()
    table.dateTime('expire_date').notNullable()
    table.dateTime('scheduled_date')
    table.dateTime('dispatch_date')
    addReference(table, tablenames.production)
    addReference(table, tablenames.location)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.science, table => {
    table.increments().notNullable()
    addReference(table, tablenames.product)
    addReference(table, tablenames.parameter)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.data, table => {
    table.increments().notNullable()
    table.string('value', 16)
    addReference(table, tablenames.science)
    addReference(table, tablenames.production)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.filesystem, table => {
    table.increments().notNullable()
    table.string('name', 128).notNullable()
    table.string('type', 128)
    table.text('body').notNullable()
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
    table.integer('source_id').unsigned()
    table
      .foreign(['source_id', 'table_id'])
      .references(['id', 'table_id'])
      .inTable(tablenames.source)
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
    table.integer('dose_id').unsigned()
    table
      .foreign(['dose_id', 'table_id'])
      .references(['id', 'table_id'])
      .inTable(tablenames.lysate)
      .onDelete('CASCADE')
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.user, table => {
    table.increments().notNullable()
    table.string('username', 128).notNullable().unique()
    table.string('password', 128).notNullable()
    addReference(table, tablenames.person)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.role, table => {
    table.increments().notNullable()
    table.string('description', 128).notNullable().unique()
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.permission, table => {
    table.increments().notNullable()
    table.string('relation', 128).notNullable()
    table.enu('permission', enums.permissions)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.member, table => {
    table.increments().notNullable()
    addReference(table, tablenames.user)
    addReference(table, tablenames.role)
    addDefaultColumns(table)
  })
  await knex.schema.createTable(tablenames.right, table => {
    table.increments().notNullable()
    addReference(table, tablenames.permission)
    addReference(table, tablenames.role)
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