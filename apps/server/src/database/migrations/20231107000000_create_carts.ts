import { Knex } from 'knex';

const TABLE_NAME = 'carts';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(
    "CREATE TYPE cartStatusType AS ENUM ('active', 'purchased', 'archived', 'abandoned')"
  );

  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();

    // Foreign Key
    table
      .integer('appUserId')
      .unsigned()
      .references('id')
      .inTable('appUsers')
      .notNullable()
      .onDelete('CASCADE');

    table
      .specificType('status', 'cartStatusType')
      .notNullable()
      .defaultTo('active');

    // table.timestamp('lastActivityAt');
    // table.boolean('reminder_sent');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
