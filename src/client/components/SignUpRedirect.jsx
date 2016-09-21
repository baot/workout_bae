import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Spinner from 'react-spinkit';

class SignUpRedirect extends Component {
  componentDidMount() {
    setTimeout(() => browserHistory.push('/login'), 3000);
  }

  render() {
    return (
      <div className="wrapper">
        <h3>Sign up Success</h3>
        <Spinner spinnerName="wordpress" />
      </div>
    );
  }
}

export default SignUpRedirect;
