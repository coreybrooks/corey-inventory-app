import React from 'react';
import { IndexRoute, Route, Router, hashHistory } from 'react-router';

import Main from '../components/Main';
import SignupForm from '../components/inventory/SignupForm';
import LoginForm from '../components/inventory/LoginForm';
import Member from '../components/inventory/Member';

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="login" component={LoginForm} />
      <Route path="signup" component={SignupForm} />
      <Route path="members/:companyName" component={Member} />
      {/*<Route path="listing/:subredditId" component={Listing} />*/}
      <IndexRoute component={LoginForm} />
    </Route>
      {/*<Route path="comments/:subredditId/:title" component={Comments} />*/}
  </Router>
);
