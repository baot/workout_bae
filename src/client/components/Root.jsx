import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import Routes from '../routes';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './styles/main.css';

const muiTheme = getMuiTheme({});

class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router history={this.props.history}>
            {Routes}
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;

