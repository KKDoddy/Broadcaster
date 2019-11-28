/* eslint-disable object-shorthand */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import user from '../models/user';

class authorization {
  static signin(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const found = user.find((acc) => acc.email === req.body.email);

      if (found) {
        if (bcrypt.compareSync(req.body.password, found.password)) {
          const token = jwt.sign({ email: found.email }, process.env.PRIVATEKEY);
          res
            .status(200)
            .json({
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

  static signup(req, res) {
    const {
      firstName, lastName, email, phoneNumber, username,
    } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {

      const emailExists = user.find((acc) => acc.email === email);
      
      if (emailExists) {
          res.status(409).json({
            status: 409,
            error: 'account with the same email already exists',
          });
      } else {
        let actualId;
        if(user.length!=0){
          actualId = user[user.length-1].id + 1;
        } else {
          actualId = 1 ;
        }
        const password = bcrypt.hashSync(req.body.password, 10);
        user.push({
          id: actualId,
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
          data: [{ token: token, created: user[user.length-1] }],
        });
      }
    }
  }
}

export default authorization;
