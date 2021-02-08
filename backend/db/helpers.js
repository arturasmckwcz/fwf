const addDefaultColumns = table => {
  table.timestamps(false, true)
  table.dateTime('deleted_at')
}

const addContactInfo = table => {
  table.string('address', 127)
  table.string('email', 127)
  table.string('phone', 127)
}

const addReference = (table, foreignTableName, not_nullable = true) => {
  const addTable = table
    .integer(`${foreignTableName}_id`)
    .unsigned()
    .references('id')
    .inTable(foreignTableName)
    .onDelete('cascade')
  if (not_nullable) {
    addTable.notNullable()
  }
}

module.exports = { addDefaultColumns, addContactInfo, addReference }
