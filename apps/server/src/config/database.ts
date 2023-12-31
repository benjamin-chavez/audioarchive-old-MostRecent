// src/database/db.ts

import 'dotenv/config';
import knexConstructor from 'knex';
import knexConfig from '../../knexfile';
// import updateTypes from 'knex-types';

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const knex = knexConstructor(config);

export default knex;
