import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import executeQuery from '../config/connection';
import user from '../queries/user';

dotenv.config();

const isLoggedIn = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.header('token'), process.env.PRIVATEKEY);
    req.uEmail = decoded.email;
    const pretender = await executeQuery(user.userExists, [req.uEmail]);
    if (pretender[0]) {
      req.uId = pretender[0].id;
      next();
    } else {
      res.status(401).json({ error: 'user not recognized' });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export default isLoggedIn;
