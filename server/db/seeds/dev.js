/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE "users" CASCADE');
  await knex.raw('TRUNCATE TABLE "tokens" CASCADE');

  await knex('users').insert([
    {
      id: 1,
      login: 'userAdmin',
      password: '12345',
    },
  ]);

  await knex('tokens').insert([
    {
      id: 1,
      refreshToken: 'JWT',
    },
  ]);
};
