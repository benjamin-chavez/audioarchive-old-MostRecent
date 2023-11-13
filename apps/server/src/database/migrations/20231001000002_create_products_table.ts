import { Knex } from 'knex';

const TABLE_NAME = 'products';

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    // Primary Key
    table.increments('id').primary();

    // Foreign Key
    table
      .integer('appUserId')
      .unsigned()
      .references('appUsers.id')
      .notNullable()
      .onDelete('CASCADE');

    table
      .integer('accountId')
      .unsigned()
      .references('id')
      .inTable('accounts')
      .notNullable()
      .onDelete('CASCADE');

    // Essential Columns
    table.string('name').notNullable();
    table.specificType('genre', 'genre').notNullable();
    table.specificType('software', 'software').notNullable();
    table
      .integer('bpm')
      .unsigned()
      .notNullable()
      .checkBetween([[20, 999]]);
    table
      .decimal(
        'price'
        // [precision, scale]
      )
      .checkPositive()
      .unsigned()
      .notNullable();

    table.string('imgS3Key', 512).defaultTo('default-album-artwork-seed.webp');
    table.string('imgS3Url', 512);

    table
      .string('digitalFileS3Key', 512)
      .defaultTo('ableton-audio-archive-demo-file-project-seed.zip');
    table.string('digitalFileS3Url', 512);

    // New Optional Columns
    table.string('key'); // Optional column for a unique key or identifier
    table.string('label'); // Optional column for a display label
    table.text('description'); // Optional column for a longer description. Using 'text' type for potentially longer content.

    table.string('stripeProductId').notNullable();

    // Metadata Columns
    table.timestamps(true, true);

    // Composite Unique Constraint
    table.unique(['appUserId', 'name']);

    table.index('stripeProductId');
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};

//     // table.enu('column', ['dubstep', 'house', 'pop', 'trap'], {
//   useNative: true,
//   enumName: 'genre',
// });
