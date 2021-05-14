import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';

const AuthorizationForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), values);
        const { token, username } = response.data;
        auth.logIn(token, username);
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw error;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form className="p-3" onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="username">{t('nickname')}</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                name="username"
                required
                type="text"
                isInvalid={authFailed}
                autoComplete="username"
                id="username"
                ref={inputRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">{t('password')}</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.password}
                required
                name="password"
                isInvalid={authFailed}
                autoComplete="current-password"
                type="password"
                id="password"
              />
              {authFailed && (
                <Form.Control.Feedback type="invalid">{t('wrongData')}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Button type="submit" variant="outline-primary" className="w-100 mb-3">
              {t('login')}
            </Button>
            <div className="d-flex flex-column align-items-center">
              <span className="small mb-2">{t('noAccount')}</span>
              <Link to="/signup">{t('registration')}</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationForm;
