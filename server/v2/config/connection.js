import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;
/* istanbul ignore else */
if (process.env.NODE_ENV === 'TEST') {
  pool = new Pool({ connectionString: process.env.TESTDATABASE });
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

/* istanbul ignore next */
const executeQuery = async (text, parameters = []) => {
  const result = await pool.query(text, parameters);
  return result.rows || result;
};

export default executeQuery;
