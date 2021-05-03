import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
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

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <form className="p-3">
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                {t('nickname')}
              </label>
              <Field
                name="username"
                required
                component="input"
                type="text"
                autoComplete="username"
                id="username"
                className="form-control"
                value=""
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                {t('password')}
              </label>
              <Field
                required
                component="input"
                name="password"
                autoComplete="current-password"
                type="password"
                id="password"
                className="form-control"
                value=""
              />
              <div className="invalid-feedback">{t('wrongData')}</div>
            </div>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
              Войти
            </button>
            <div className="d-flex flex-column align-items-center">
              <span className="small mb-2">{t('noAccount')}</span>
              <Link to="/signup">{t('registration')}</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ConnectedNewTaskForm = connect(mapStateToProps, actionCreators)(AuthorizationForm);

export default reduxForm({
  form: 'newTask',
})(ConnectedNewTaskForm);
