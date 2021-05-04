import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as actions from '../actions/index.js';

const mapStateToProps = () => {
  const props = {};
  return props;
};

const actionCreators = {
  addTask: actions.addTask,
};

const AuthorizationForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
                autoComplete="current-password"
                type="password"
                id="password"
              />
              <div className="invalid-feedback">{t('wrongData')}</div>
            </Form.Group>
            <Button type="submit" variant="outline-primary" className="w-100 mb-3">
              Войти
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

const ConnectedNewTaskForm = connect(mapStateToProps, actionCreators)(AuthorizationForm);

export default reduxForm({
  form: 'newTask',
})(ConnectedNewTaskForm);
