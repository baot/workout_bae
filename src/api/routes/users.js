import express from 'express';
import validator from 'validator';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import co from 'co';

import jwt from '../services/jwt';
import User from '../models/User';

let router = express.Router();

function validateInput(data) {
  let errors = {};
  const requiredFields = ['email', 'password', 'passwordConfirm'];

  _.each(requiredFields, (field) => {
    if (!_.has(data, field) || !data[field]) errors[field] = `${field} is required`;
  });

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
}

function comparePassword(pass, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, hash, (err, result) => {
      if (err) { return reject(err); }
      return result ? resolve() : reject();
    });
  });
}

router.route('/signup').post((req, res) => {
  setTimeout(() => { // testing purpose
    const body = req.body;
    const { errors, isValid } = validateInput(body);

    if (!isValid) {
      return res.status(400).send(errors);
    }

    const newUser = new User({
      email: body.email,
      password: body.password,
    });

    const payload = {
      iss: req.hostname,
      sub: body.email,
    };
    const token = jwt.encode(payload, 'some secret key');

    return co(function* signUp() {
      try {
        const user = yield newUser.save();
        return res.status(200).json({
          user: user.toJSON(),
          token,
        });
      } catch (e) {
        if (e.code === 11000) { // duplicate key error
          return res.status(400).send({ _error: 'User already exists' });
        }

        return res.status(500).send({ _error: 'Something goes wrong ' });
      }
    });
  }, 3000);
});

router.route('/signin').post((req, res) => {
  setTimeout(() =>  // testing purpose
    co(function* signIn() {
      try {
        const user = yield User.findOne({ email: req.body.email });
        const payload = {
          iss: req.hostname,
          sub: req.body.email,
        };
        const token = jwt.encode(payload, 'secret');
        yield comparePassword(req.body.password, user.password);
        return res.status(200).json({ token, user: user.toJSON() });
      } catch (e) {
        return res.status(400).send({ _error: 'Email or Password is wrong' });
      }
    })
  , 3000);
});

module.exports = router;
