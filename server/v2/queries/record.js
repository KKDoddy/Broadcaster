const recordQueries = {
  createRecord: 'INSERT INTO records (id, title, type, comment, location, status, image, video, createdBy) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
  editRecordComment: 'UPDATE records SET comment=$1 WHERE id=$2 AND type=$3 RETURNING *',
  editRecordLocation: 'UPDATE records SET location=$1 WHERE id=$2 AND type=$3 RETURNING *',
  editRecordStatus: 'UPDATE records SET status=$1 WHERE id=$2 AND type=$3 RETURNING *',
  deleteRecord: 'DELETE FROM records WHERE id=$1 AND type=$2',
  getRecord: 'SELECT * FROM records WHERE id=$1 AND type=$2',
  getAllRecord: 'SELECT * FROM records WHERE type=$1',
  getAllMyRecord: 'SELECT * FROM records WHERE createdby=$1 AND type=$2',
};

export default recordQueries;
