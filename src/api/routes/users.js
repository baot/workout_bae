const User = require('../models/User');
const express = require('express');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('../services/jwt');

let router = express.Router();

function validateInput(data) {
  let errors = {};
  const requiredFields = ['email', 'password', 'passwordConfirm'];

  _.each(requiredFields, (field) => {
    if (!_.has(data, field) || !data[field]) errors[field] = field + ' is required';
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

router.route('/signup').post(function(req, res) {
  setTimeout(function() { // testing purpose
    const body = req.body;
    const { errors, isValid } = validateInput(req.body);

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

    newUser.save(function(err) {
      if (err) {
        if (err.code === 11000) {// duplicate key error
          return res.status(400).send({ _error: 'User already exists' });
        } else {
          return res.status(500).send({ _error: 'Something goes wrong' });
        }
      }
      res.status(200).json({
        user: newUser.toJSON(),
        token: token,
      });
    });
  }, 3000);
});

module.exports = router;
