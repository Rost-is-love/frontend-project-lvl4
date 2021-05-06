import React from 'react';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';

import App from './components/App.jsx';
import createStore from './store.js';
import resources from './locales/ru.js';

export default () => {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
  });

  const store = createStore();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
