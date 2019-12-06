import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import executeQuery from '../config/connection';
import user from '../queries/user';

dotenv.config();

const checkAdmin = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.header('token'), process.env.PRIVATEKEY);
    req.uEmail = decoded.email;
    req.role = decoded.role;
    const pretender = await executeQuery(user.userExists, [req.uEmail]);
    if (pretender[0]) {
      if (pretender[0].role === 'admin') {
        req.uId = pretender[0].id;
        next();
      } else {
        throw new Error('Not authorized');
      }
    } else {
      res.status(401).json({ status: 401, error: 'user not recognized' });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default checkAdmin;
