import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import _ from 'lodash';

export const renderTextField = ({ input, label, type, meta: { touched, error } }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    {...input}
  />
);

export const renderDatePicker = ({ input, label, meta:{}, ...rest }) => (
  <DatePicker
    hintText={label}
    value={input.value}
    onChange={(event, value) => input.onChange(value)}
    {...rest}
  />
);

export const validateSignUpInput = (values) => {
  const errors = {};
  const requiredFields = ['email', 'password', 'passwordConfirm'];
  _.each(requiredFields, (field) => {
    if (!values[field]) {
      errors[field] = 'is required';
    }
  });
  // email validation
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

export const validateLoginInput = (values) => {
  const errors = {};
  const requiredFields = ['email', 'password'];
  _.each(requiredFields, (field) => {
    if (!values[field]) {
      errors[field] = 'is required';
    }
  });
  // email validation
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

