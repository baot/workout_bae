import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';

class SignUpRedirect extends Component {
  componentDidMount() {
    setTimeout(() => browserHistory.push('/login'), 1000);
  }

  render() {
    return (
      <div className="wrapper">
        <h3>Sign up Success</h3>
        <LinearProgress mode="indeterminate" />
      </div>
    );
  }
}

export default SignUpRedirect;
