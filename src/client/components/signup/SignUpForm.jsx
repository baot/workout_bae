import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { has } from 'ramda';

import { renderTextField, validateSignUpInput } from '../helpers/FormComponents';
import SignUpRedirect from './SignUpRedirect';
import LoadingSubmitButton from './LoadingSubmitButton';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedUp: false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(userData) {
    return this.props.signupUser(userData)
      .then((response) => {
        // request succeeded
        if (response.status === 200) {
          this.setState({ signedUp: true });
          return;
        }

        // request failed
        return response.json().then((errors) => {
          throw new SubmissionError(errors);
        });
      })
      .catch((e) => {
        if (has('_error')(e.errors)) {
          throw new SubmissionError(e.errors);
        }
        throw new SubmissionError({ _error: 'Signup failed' });
      });
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;

    if (this.state.signedUp) {  // sign up successed
      return (
        <SignUpRedirect />
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
          <LoadingSubmitButton submitting={submitting} />
        </div>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  signupUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  error: PropTypes.node,
};

export default reduxForm({
  form: 'SignUpForm',
  validate: validateSignUpInput,
})(SignUpForm);
