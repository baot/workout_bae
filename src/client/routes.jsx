import React from 'react';
import { Route, IndexRoute } from 'react-router';

import WorkoutsPage from './components/WorkoutsPage';
import SignUp from './components/SignUp';
import App from './components/App';
import Login from './components/Login';

export default (
  <Route path="/" component={App}>
    <Route path="signup" component={SignUp} />
    <Route path="login" component={Login} />
    <Route path="workout" component={WorkoutsPage} />
  </Route>
);
