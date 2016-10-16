import express from 'express';
import validator from 'validator';

import jwt from '../services/jwt';
import { validateInput, comparePassword } from '../utils/auth';
import User from '../models/User';

let router = express.Router();

router.route('/signup').post(async function(req, res) {
  const body = req.body;
  const result = validateInput(body);

  if (result.isLeft()) {
    return res.status(400).send(result.left());
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

  try {
    const user = await newUser.save();
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

router.route('/signin').post(async function(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const payload = {
      iss: req.hostname,
      sub: req.body.email,
    };
    const token = jwt.encode(payload, 'secret');
    await comparePassword(req.body.password, user.password);
    return res.status(200).json({ token, user: user.toJSON() });
  } catch (e) {
    return res.status(400).send({ _error: 'Email or Password is wrong' });
  }
});

module.exports = router;
