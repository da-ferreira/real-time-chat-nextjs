import dotenv from 'dotenv';
import knex from 'knex'

dotenv.config({ path: '.env' });

export const db = knex({
  client: 'mysql2',
  connection: process.env.DATABASE_URL,
  searchPath: ['knex', 'public'],
  pool: { min: 2, max: 7 }
});