import executeQuery from './connection';

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

  const redflagTable = `CREATE TABLE IF NOT EXISTS redflags (
        id SERIAL NOT NULL PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        comment TEXT NOT NULL,
        location TEXT NOT NULL,
        status TEXT NOT NULL,
        image TEXT,
        video TEXT,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        createdBy TEXT NOT NULL
    )`;

  await executeQuery(userTable, []);
  await executeQuery(redflagTable, []);
};

createTable();
