import React from 'react';
import i18n from 'i18next';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';

import App from './components/App.jsx';
import reducers from './reducers/index.js';
import resources from './locales/ru.js';

export default () => {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
  });

  const store = createStore(reducers);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
