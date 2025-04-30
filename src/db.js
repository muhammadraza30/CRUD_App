const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connect = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Connection error', err.stack);
    throw err;
  }
};

const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error('Query error', err.stack);
    throw err;
  }
};

module.exports = { connect, query, pool };