import React from 'react';
import i18next from 'i18next';
import * as yup from 'yup';
import { Provider, useDispatch } from 'react-redux';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { noop } from 'lodash';
import getLogger from '../lib/logger.js';

import App from './components/App.jsx';
import createStore from './store.js';
import resources from './locales/ru.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import { hideModal } from './slices/modalsSlice.js';
import SocketContext from './contexts/socketContext.jsx';
import yupDictionary from './locales/yup.js';

export default async (socket) => {
  const store = createStore();
  const logSocket = getLogger('socket');

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
  });
  yup.setLocale(yupDictionary);

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage({ message }));
    logSocket('newMessage', message);
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel({ channel }));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel({ id }));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
  });

  const withTimeout = (onSuccess, onTimeout, timeout) => {
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
        return;
      }
      called = true;
      clearTimeout(timer);
      onSuccess(args);
    };
  };

  const hadnleSocketEmit = (action, data, onHide) => {
    /* if (socket.disconnected) {
      throw new Error('networkError');
    } */
    socket.emit(
      action,
      data,
      withTimeout(
        () => {
          onHide();
          console.log('success!');
        },
        () => {
          console.log('timeout!');
        },
        1000,
      ),
    );
  };

  const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();
    const onHide = () => {
      dispatch(hideModal());
    };

    const renameChan = (channel) => {
      hadnleSocketEmit('renameChannel', channel, onHide);
    };

    const addChan = (channel) => {
      hadnleSocketEmit('newChannel', channel, onHide);
    };

    const removeChan = (id) => {
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
