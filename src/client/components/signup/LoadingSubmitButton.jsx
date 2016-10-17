import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingSubmitButton = ({ submitting }) => (
  (submitting)
  ? <CircularProgress />
  : <RaisedButton
    type="submit"
    label="Submit"
    primary
  />
);

LoadingSubmitButton.propTypes = {
  submitting: PropTypes.bool.isRequired,
};

export default LoadingSubmitButton;
