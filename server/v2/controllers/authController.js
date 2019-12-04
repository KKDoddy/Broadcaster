/* eslint-disable object-shorthand */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import user from '../queries/user';
import executeQuery from '../config/connection';

class authorization {
  static async signup(req, res) {
    const {
      firstName, lastName, email, phoneNumber, username,
    } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const emailExists = await executeQuery(user.userExists, [email]);
      console.log(emailExists.length);
      if (emailExists.length === 1) {
        res.status(409).json({
          status: 409,
          error: 'account with the same email already exists',
        });
      } else {
        const password = bcrypt.hashSync(req.body.password, 10);
        await executeQuery(user.createUser, [firstName, lastName, username, email, phoneNumber, password]);
        const token = jwt.sign({ email: email }, process.env.PRIVATEKEY);
        const saved = await executeQuery(user.userExists, [email]);
        res.status(201).json({
          status: 201,
          message: 'User created successfully',
          data: [{
            token: token,
            created: {
              id: saved[0].id,
              firstName: saved[0].firstname,
              lastName: saved[0].lastname,
              email: saved[0].email,
              phoneNumber: saved[0].phonenumber,
              username: saved[0].username,
            },
          }],
        });
      }
    }
  }
}

export default authorization;
