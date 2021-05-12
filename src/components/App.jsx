// prettier-ignore
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AuthorizationForm from './AuthorizationForm.jsx';
import RegistrationForm from './RegistrationForm.jsx';
import ChatPage from './ChatPage.jsx';
import Modals from './modals/Modals.jsx';
// import NotFoundPage from './404.jsx';
import authContext from '../contexts/authContext.jsx';
import useAuth from '../hooks/useAuth.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>{children}</authContext.Provider>
  );
};

// prettier-ignore
const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      render={({ location }) => (auth.loggedIn
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useContext(authContext);

  return auth.loggedIn ? <Button onClick={auth.logOut}>{t('logout')}</Button> : null;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar bg="light" expand="lg" className="mb-3">
          <Navbar.Brand as={Link} to="/" className="mr-auto">
            Hexlet Chat
          </Navbar.Brand>
          <AuthButton />
        </Navbar>
        <Switch>
          <Route path="/login">
            <AuthorizationForm />
          </Route>
          <Route path="/signup">
            <RegistrationForm />
          </Route>
          {/* <Route path="*" exact>
            <NotFoundPage />
          </Route> */}
          <PrivateRoute path="/">
            <ChatPage />
          </PrivateRoute>
        </Switch>
      </div>
      <Modals />
    </Router>
  </AuthProvider>
);

export default App;
