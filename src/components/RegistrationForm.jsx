import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import * as actions from '../actions/index.js';

const mapStateToProps = () => {
  const props = {};
  return props;
};

const actionCreators = {
  addTask: actions.addTask,
};

const RegistrationForm = () => {
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
                placeholder="От 3 до 20 символов"
                name="username"
                component="input"
                autoComplete="username"
                required
                id="username"
                className="form-control"
                value=""
              />
              <div className="invalid-feedback">{t('requiredField')}</div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                {t('password')}
              </label>
              <Field
                component="input"
                placeholder="Не менее 6 символов"
                name="password"
                required
                autoComplete="new-password"
                type="password"
                id="password"
                className="form-control"
                value=""
              />
              <div className="invalid-feedback">{t('requiredField')}</div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                {t('confirmPassword')}
              </label>
              <Field
                component="input"
                placeholder="Пароли должны совпадать"
                name="confirmPassword"
                required
                autoComplete="new-password"
                type="password"
                id="confirmPassword"
                className="form-control"
                value=""
              />
              <div className="invalid-feedback" />
            </div>
            <button type="submit" className="w-100 btn btn-outline-primary">
              {t('signup')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ConnectedNewTaskForm = connect(mapStateToProps, actionCreators)(RegistrationForm);

export default reduxForm({
  form: 'newTask',
})(ConnectedNewTaskForm);
