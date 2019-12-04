import executeQuery from './connection';

const dropTables = async () => {
  try {
    const dropRedflagTable = 'DROP TABLE IF EXISTS redflags CASCADE';
    await executeQuery(dropRedflagTable, []);
    const dropUserTable = 'DROP TABLE IF EXISTS users CASCADE';
    await executeQuery(dropUserTable, []);
  } catch (error) {
    console.log(error);
  }
};

dropTables();
