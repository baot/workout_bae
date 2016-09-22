import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';

import SignUpRedirect from './SignUpRedirect';
import { renderTextField, validateSignUpInput } from './helpers/FormComponents';

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
      LoadingOrSubmitButton = <CircularProgress />;
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
      <div className="wrapper">
        <h1>Sign Up</h1>
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
      </div>
    );
  }
}

export default connect()(reduxForm({
  form: 'SignUpForm',
  validate: validateSignUpInput,
})(SignUpForm));
