// prettier-ignore
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import React from 'react';

import AuthorizationForm from './AuthorizationForm.jsx';
import RegistrationForm from './RegistrationForm.jsx';

const PrivateRoute = ({ path }) => (
  <Route
    path={path}
    render={({ location }) => <Redirect to={{ pathname: '/login', state: { from: location } }} />}
  />
);

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
        <Link className="mr-auto navbar-brand" to="/login">
          Hexlet Chat
        </Link>
      </nav>
      <Switch>
        <Route path="/login">
          <AuthorizationForm />
        </Route>
        <Route path="/signup">
          <RegistrationForm />
        </Route>
        <PrivateRoute path="/" exact>
          <div>chat</div>
        </PrivateRoute>
      </Switch>
    </Router>
  </div>
);

export default App;
