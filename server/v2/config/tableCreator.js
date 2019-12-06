import executeQuery from './connection';
import { getMaxListeners } from 'cluster';

const createTable = async () => {
  const userTable = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL NOT NULL PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phoneNumber TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )`;

  const recordTable = `CREATE TABLE IF NOT EXISTS records (
        id TEXT NOT NULL PRIMARY KEY,
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
  await executeQuery(recordTable, []);
  const createAdmin = "INSERT INTO users (firstName, lastName, username, email, phonenumber, password, role) VALUES ('Doddy','Kalimba','Kkd','kddy@gmail.com','0782244544','$2b$10$5.knSC0H8z/PpUPwFeV2cOqWUb3jUJ0bQh4YwWTC4qbHIEzC2fXoq','admin')";
  await executeQuery(createAdmin, []);
};

createTable();
