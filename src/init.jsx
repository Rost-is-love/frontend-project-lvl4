import React from 'react';
import i18next from 'i18next';
import * as yup from 'yup';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import SocketContext from './contexts/socketContext.jsx';
import getLogger from '../lib/logger.js';

import App from './components/App.jsx';
import resources from './locales/ru.js';
import reducer, { actions } from './slices';
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

  // prettier-ignore
  const wrapSocket = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    // eslint-disable-next-line functional/no-let
    let called = false;
    const timer = setTimeout(() => {
      if (called) {
        return;
      }
      called = true;
      reject(new Error('networkError'));
    }, 1000);

    socketFunc(...args, (response) => {
      if (called) {
        return;
      }
      called = true;
      clearTimeout(timer);
      if (response.status === 'ok') {
        resolve();
      }
      reject();
    });
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketContext.Provider
          value={{
            renameChannel: wrapSocket((...args) => socket.volatile.emit('renameChannel', ...args)),
            removeChannel: wrapSocket((...args) => socket.volatile.emit('removeChannel', ...args)),
            addChannel: wrapSocket((...args) => socket.volatile.emit('newChannel', ...args)),
            sendMessage: wrapSocket((...args) => socket.volatile.emit('newMessage', ...args)),
          }}
        >
          <App />
        </SocketContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};
