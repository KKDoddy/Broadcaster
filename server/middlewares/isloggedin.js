import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user';

dotenv.config();

const isLoggedIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.header('token'), process.env.PRIVATEKEY);
    req.uEmail = decoded.email;
    const pretender = User.find((u) => u.email === req.uEmail);
    if (pretender) {
      next();
    } else {
      res.status(401).json({ error: 'user not recognized' });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export default isLoggedIn;
