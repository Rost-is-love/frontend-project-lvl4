import React from 'react';
import i18next from 'i18next';
import * as yup from 'yup';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import getLogger from '../lib/logger.js';

import App from './components/App.jsx';
import resources from './locales/ru.js';
import reducer, { actions } from './slices';
import SocketProvider from './SocketProvider.jsx';
import yupDictionary from './locales/yup.js';

export default async (socket) => {
  const store = configureStore({ reducer });
  const logSocket = getLogger('socket');

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
  });
  yup.setLocale(yupDictionary);

  socket.on('newMessage', (message) => {
    store.dispatch(actions.addMessage({ message }));
    logSocket('newMessage', message);
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(actions.addChannel({ channel }));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(actions.removeChannel({ id }));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(actions.renameChannel(channel));
  });

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  );
};
