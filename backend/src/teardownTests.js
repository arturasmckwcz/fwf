module.exports = async () => {
  const db = require('./db');
  await db.migrate.rollback();
  await db.destroy();
};