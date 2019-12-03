import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE });

const createTable = async () => {
  const redflagTable = `CREATE TABLE IF NOT EXISTS redflags (
        id SERIAL NOT NULL PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        comment TEXT NOT NULL,
        location TEXT NOT NULL,
        status TEXT NOT NULL,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        createdBy TEXT NOT NULL
    )`;

  try {
    const dropRedflagTable = 'DROP TABLE IF EXISTS redflags CASCADE';
    await pool.query(dropRedflagTable);
  } catch (error) {
    console.log(error);
  }

  await pool.query(redflagTable);
};

createTable();

const redflagQueries = {
  redflag: 'INSERT INTO redflag (title, type, comment, location, status, image, video, createdBy) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
  editRedflagComment: 'UPDATE redflag SET comment=$1 WHERE id=$2 RETURNING *',
  editRedflagLocation: 'UPDATE redflag SET location=$1 WHERE id=$2 RETURNING *',
  deleteRedflag: 'DELETE FROM redflag WHERE id=$1',
  getRedflag: 'SELECT * FROM redflag WHERE id=$1',
  findRedflag: 'SELECT * FROM redflag WHERE id=$1',
  getAllRedflag: 'SELECT * FROM redflag',
};

export default redflagQueries;
