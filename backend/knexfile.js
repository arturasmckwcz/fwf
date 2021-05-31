require('dotenv').config()
module.exports = {
  development: {
    client: 'pg',
    connection: {
      // host: process.env.POSTGRES_DB_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_DB_TEST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
}
