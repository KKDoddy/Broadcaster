import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user';

dotenv.config();

const isLoggedIn = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.header('token'), process.env.PRIVATEKEY);
    req.uEmail = decoded.email;
    const pretender = await User.find((u) => u.email === req.uEmail);
    if (pretender) {
      req.uId = pretender.id;
      next();
    } else {
      return res.status(401).json({ error: 'user not recognized' });
    }
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export default isLoggedIn;
