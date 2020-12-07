module.exports = async () => {
  const db = require('./db');
  await db.migrate.latest();
  await db.seed.run();
};
