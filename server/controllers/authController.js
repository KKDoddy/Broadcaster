/* eslint-disable object-shorthand */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import user from '../models/user';

class authorization {

  static signup(req, res) {
    // validation
    const {
 id, firstName, lastName, email, phoneNumber, username 
} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const emailExists = user.find((acc) => acc.email === email);

      const idExists = user.find((acc) => acc.id === id);

      if (emailExists || idExists) {
        if (emailExists && idExists) {
          res.status(409).json({
            status: 409,
            error: 'account with the same id and email already exists',
          });
        } else if (emailExists) {
          res.status(409).json({
            status: 409,
            error: 'account with the same email already exists',
          });
        } else {
          res.status(409).json({
            status: 409,
            error: 'account with the same id already exists',
          });
        }
      } else {
        const password = bcrypt.hashSync(req.body.password, 10);
        user.push({
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          username: username,
          password: password,
        });
        const token = jwt.sign({ email: email }, process.env.PRIVATEKEY);
        res.status(201).json({
          status: 201,
          message: 'User created successfully',
          data: [{ token: token }],
        });
      }
    }

  }

}

export default authorization;