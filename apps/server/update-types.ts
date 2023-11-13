// import knexConstructor from 'knex';
// import db from './knexfile';
// const { knex } = require('knex');
const { updateTypes } = require('knex-types');
// const db = knex(require('./knexfile'));

import knex from 'knex';
import knexConfig from './knexfile'; // adjust path accordingly

const db = knex(knexConfig.development); // or whatever environment you're using

// import updateTypes from 'knex-types';

// const { knex } = require('knex');

// const db = knex(require('./knexfile'));
// @ts-ignore
updateTypes(db, { output: './types.ts' }).catch((err) => {
  console.error(err);
  process.exit(1);
});
