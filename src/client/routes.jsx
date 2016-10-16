import React from 'react';
import { Route } from 'react-router';

import WorkoutsPage from './components/workout/WorkoutsPage';
import SignUp from './components/signup/SignUp';
import App from './components/common/App';
import Login from './components/login/Login';

export default (
  <Route path="/" component={App}>
    <Route path="signup" component={SignUp} />
    <Route path="login" component={Login} />
    <Route path="workout" component={WorkoutsPage} />
  </Route>
);
