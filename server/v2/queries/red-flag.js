const redflagQueries = {
  createRedFlag: 'INSERT INTO redflags (id, title, type, comment, location, status, image, video, createdBy) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
  editRedflagComment: 'UPDATE redflags SET comment=$1 WHERE id=$2 RETURNING *',
  editRedflagLocation: 'UPDATE redflags SET location=$1 WHERE id=$2 RETURNING *',
  deleteRedflag: 'DELETE FROM redflags WHERE id=$1',
  getRedflag: 'SELECT * FROM redflags WHERE id=$1',
  getAllRedflag: 'SELECT * FROM redflags',
};

export default redflagQueries;
