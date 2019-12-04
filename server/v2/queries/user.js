const userQueries = {
  createUser: 'INSERT INTO users (firstName, lastName, username, email, phonenumber, password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
  userExists: 'SELECT * FROM users WHERE email=$1',
};

export default userQueries;
