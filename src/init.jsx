import React from 'react';
import i18next from 'i18next';
import * as yup from 'yup';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { noop } from 'lodash';
import getLogger from '../lib/logger.js';

import App from './components/App.jsx';
import reducer from './store.js';
import resources from './locales/ru.js';
import { actions } from './slices';
import SocketContext from './contexts/socketContext.jsx';
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

  const withTimeout = (onSuccess, onTimeout, timeout, onHide) => {
    // eslint-disable-next-line functional/no-let
    let called = false;

    const timer = setTimeout(() => {
      if (called) {
        return;
      }
      called = true;
      onTimeout();
    }, timeout);

    return (...args) => {
      if (called) {
        onHide();
        return;
      }
      called = true;
      onHide();
      clearTimeout(timer);
      onSuccess(args);
    };
  };

  const hadnleSocketEmit = (action, data, onHide) => {
    socket.emit(
      action,
      data,
      withTimeout(
        () => {
          console.log('success!');
        },
        () => {
          console.log('timeout!');
        },
        1000,
        onHide,
      ),
    );
  };

  const SocketProvider = ({ children }) => {
    const renameChan = (channel, onHide) => {
      hadnleSocketEmit('renameChannel', channel, onHide);
    };

    const addChan = (channel, onHide) => {
      hadnleSocketEmit('newChannel', channel, onHide);
    };

    const removeChan = (id, onHide) => {
      hadnleSocketEmit('removeChannel', id, onHide);
    };

    const sendMessage = (message) => {
      if (socket.disconnected) {
        const sendingMessage = setInterval(() => {
          socket.volatile.emit('newMessage', message, (response) => {
            if (response.status === 'ok') {
              clearInterval(sendingMessage);
            }
          });
        }, 1000);
      } else {
        socket.emit('newMessage', message, noop);
      }
    };

    return (
      <SocketContext.Provider
        value={{
          renameChan,
          removeChan,
          addChan,
          sendMessage,
        }}
      >
        {children}
      </SocketContext.Provider>
    );
  };

  return (
    <Provider store={store}>
      <SocketProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  );
};
