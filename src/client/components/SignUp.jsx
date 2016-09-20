import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const validateInput = (values) => {
  const errors = {};
  const requiredFields = ['Email', 'Password'];
  requiredFields.forEach((field) => {
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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

class SignUpForm extends Component {
  static handleFormSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(SignUpForm.handleFormSubmit)}>
        <div>
          <Field name="Email" component={renderTextField} label="Email" />
        </div>
        <div>
          <Field name="Password" component={renderTextField} label="Password" />
        </div>
        <div>
          <RaisedButton
            type="submit"
            label="Submit"
            primary
          />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'SignUpForm',
  validate: validateInput,
})(SignUpForm);
