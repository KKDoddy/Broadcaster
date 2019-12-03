import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE });

const createTable = async () => {
  const userTable = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL NOT NULL PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phoneNumber TEXT NOT NULL,
        password TEXT NOT NULL
    )`;

  try {
    const dropUserTable = 'DROP TABLE IF EXISTS users CASCADE';
    await pool.query(dropUserTable);
  } catch (error) {
    console.log(error);
  }

  await pool.query(userTable);
};

createTable();

const userQueries = {
  createUser: 'INSERT INTO user (firstName, lastName, username, email, phonenumber, password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
  userExists: 'SELECT * FROM user WHERE email=$1',
};

export default userQueries;
