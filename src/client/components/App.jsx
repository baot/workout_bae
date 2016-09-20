import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default connect()(App);
