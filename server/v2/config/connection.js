import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let databaseURL = process.env.DATABASE;
/* istanbul ignore else */
if (process.env.NODE_ENV === 'TEST') {
  databaseURL = process.env.TESTDATABASE;
}

const pool = new Pool({ connectionString: databaseURL });
/* istanbul ignore next */
const executeQuery = async (text, parameters = []) => {
  const result = await pool.query(text, parameters);
  return result.rows || result;
};

export default executeQuery;
