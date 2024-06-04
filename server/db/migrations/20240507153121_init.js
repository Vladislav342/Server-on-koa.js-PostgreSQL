/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('login', 255).unique().notNullable();
      table.string('password', 255).notNullable();
      table.timestamps(true, true);
    })
    .createTable('tokens', table => {
      table.increments('id');
      table.string('refreshToken', 255).notNullable();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
