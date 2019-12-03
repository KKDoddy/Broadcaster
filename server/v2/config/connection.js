import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE });

pool.on('connect', () => {
  console.log('... database connected');
});

const executeQuery = async (text, parameters = []) => {
  const result = await pool.query(text, parameters);
  return result.rows || result;
};

export default executeQuery;
