import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';

import { renderTextField, validateLoginInput } from './helpers/FormComponents';


class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleLoginSubmit(values) {
    return fetch('http://localhost:3000/api/users/signin', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.status === 200) {
        return browserHistory.push('/workout');
      }

      return response.json().then((errors) => {
        if (!_.has(errors, '_error')) errors['_error'] = 'Signup failed!';
        throw new SubmissionError(errors);
      });
    });
  }

  render() {
    const { error, handleSubmit, submitting} = this.props;
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
        <h1>Login</h1>
        <form className="wrapper" onSubmit={handleSubmit(this.handleLoginSubmit)}>
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
  form: 'LoginForm',
  validate: validateLoginInput,
})(LoginForm));
