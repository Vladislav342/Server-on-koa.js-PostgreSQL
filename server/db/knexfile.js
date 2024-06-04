// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const { knexSnakeCaseMappers } = require('objection');

module.exports = {
  development: {
    client: 'postgres',
    connection: {
      database: 'userstable',
      user: 'postgres',
      password: '1234567890',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
    ...knexSnakeCaseMappers,
  },
};
