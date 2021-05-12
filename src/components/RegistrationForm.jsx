import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [isValidData, setIsValidData] = useState(true);
  const inputRef = useRef();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = yup.object().shape({
    username: yup.string().min(3).max(20).required(),
    password: yup.string().min(6, 'minPasswordLength').required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')])
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signupPath(), values);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError || err.response.status === 409) {
          setIsValidData(false);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form className="p-3" onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label className="form-label" htmlFor="username">
                {t('username')}
              </Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder={t('usernameLength')}
                name="username"
                autoComplete="username"
                required
                id="username"
                isInvalid={(formik.errors.username && formik.touched.username) || !isValidData}
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid">
                {t(formik.errors.username)}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label" htmlFor="password">
                {t('password')}
              </Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.upassword}
                placeholder={t('minPasswordLength')}
                name="password"
                required
                autoComplete="new-password"
                type="password"
                id="password"
                isInvalid={(formik.errors.password && formik.touched.password) || !isValidData}
              />
              <Form.Control.Feedback type="invalid">
                {t(formik.errors.password)}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label" htmlFor="confirmPassword">
                {t('confirmPassword')}
              </Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder={t('matchingPasswords')}
                name="confirmPassword"
                required
                autoComplete="new-password"
                type="password"
                id="confirmPassword"
                isInvalid={
                  (formik.errors.confirmPassword && formik.touched.confirmPassword) || !isValidData
                }
              />
              <Form.Control.Feedback type="invalid">
                {isValidData ? t(formik.errors.confirmPassword) : t('userAlreadyExists')}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-primary" className="w-100">
              {t('signup')}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;