import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppBar title="WORKOUT SWEAT" />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default connect()(App);
