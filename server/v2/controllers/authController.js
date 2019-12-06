/* eslint-disable object-shorthand */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import user from '../queries/user';
import executeQuery from '../config/connection';

class authorization {
  static async signin(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const found = await executeQuery(user.userExists, [req.body.email]);

      if (found.length === 1) {
        if (bcrypt.compareSync(req.body.password, found[0].password)) {
          const token = jwt.sign({ email: found[0].email, role: found[0].role }, process.env.PRIVATEKEY);
          res.status(200).json({
            status: 200,
            message: 'successfully logged in',
            data: [{ token: token }],
          });
        } else {
          res
            .status(401)
            .json({ status: 401, error: 'username or password incorrect' });
        }
      } else {
        res
          .status(401)
          .json({ status: 401, error: 'username or password incorrect' });
      }
    }
  }


  static async signup(req, res) {
    const {
      firstName, lastName, email, phoneNumber, username,
    } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const emailExists = await executeQuery(user.userExists, [email]);
      if (emailExists.length === 1) {
        res.status(409).json({
          status: 409,
          error: 'account with the same email already exists',
        });
      } else {
        const password = bcrypt.hashSync(req.body.password, 10);
        await executeQuery(user.createUser, [firstName, lastName, username, email, phoneNumber, password, 'citizen']);
        const token = jwt.sign({ email: email, role: 'citizen' }, process.env.PRIVATEKEY);
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
