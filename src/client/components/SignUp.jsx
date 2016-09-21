import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from 'react-spinkit';
import _ from 'lodash';

import SignUpRedirect from './SignUpRedirect';

const validateInput = (values) => { // move to other file?
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

// move to other file?
const renderTextField = ({ input, label, type, meta: { touched, error } }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    {...input}
  />
);

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedUp: false,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    // move this fetch to other file?
    return fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.status === 200) {
        return this.setState({ signedUp : true });
      }

      return response.json().then((errors) => {
        if (!_.has(errors, '_error')) errors['_error'] = 'Signup failed!';
        throw new SubmissionError(errors);
      });
    });
  }

  render() {
    const { error, handleSubmit, submitting} = this.props;

    if (this.state.signedUp) {  // sign up successed
      return (
        <SignUpRedirect />
      );
    }

    let LoadingOrSubmitButton;
    if (submitting) {  // on sign up process
      LoadingOrSubmitButton = <Spinner spinnerName="wave" />;
    } else {
      LoadingOrSubmitButton = (
        <RaisedButton
          type="submit"
          label="Submit"
          primary

        />
      );
    }

    return (
      <form className="wrapper" onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div>
          <Field name="email" component={renderTextField} label="Email" />
        </div>
        <div>
          <Field
            name="password"
            component={renderTextField}
            label="Password"
            type="password"
          />
        </div>
        <div>
          <Field
            name="passwordConfirm"
            component={renderTextField}
            label="Password Confirm"
            type="password"
          />
        </div>
        {error && <strong>{error}</strong>}
        <div className="loadingButton">
          {LoadingOrSubmitButton}
        </div>
      </form>
    );
  }
}

export default connect()(reduxForm({
  form: 'SignUpForm',
  validate: validateInput,
})(SignUpForm));
