import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';
import { signupUser } from '../../actions/signupActions';

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { signupUser } = this.props;
    return (
      <div className="wrapper">
        <h1>Sign Up</h1>
        <SignUpForm signupUser={signupUser} />
      </div>
    );
  }
}

SignUp.propTypes = {
  signupUser: PropTypes.func.isRequired,
};

export default connect(null, { signupUser })(SignUp);
