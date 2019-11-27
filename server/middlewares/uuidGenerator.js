import uuid from 'uuid';

// middleware that sets up the record's id
const getUuid = (req, res, next) => {
  req.id = uuid();
  next();
};

export default getUuid;
