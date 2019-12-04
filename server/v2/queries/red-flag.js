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
