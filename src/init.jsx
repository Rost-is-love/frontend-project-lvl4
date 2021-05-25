import React from 'react';
import i18next from 'i18next';
import * as yup from 'yup';
import { Provider } from 'react-redux';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { noop } from 'lodash';
import getLogger from '../lib/logger.js';

import App from './components/App.jsx';
import createStore from './store.js';
import resources from './locales/ru.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
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

  const hadnleSocketEmit = (action, data) => {
    if (socket.disconnected) {
      throw new Error('networkError');
    }
    socket.emit(action, data, noop);
  };

  const SocketProvider = ({ children }) => {
    const renameChan = (channel) => {
      hadnleSocketEmit('renameChannel', channel);
    };

    const addChan = (channel) => {
      hadnleSocketEmit('newChannel', channel);
    };

    const removeChan = (id) => {
      hadnleSocketEmit('removeChannel', id);
    };

    const sendMessage = (message) => {
      if (socket.disconnected) {
        setInterval(() => {
          socket.volatile.emit('newMessage', message, (response) => {
            console.log(response);
          });
        }, 1000);
      } else {
        hadnleSocketEmit('newMessage', message);
      }
      /* setInterval(() => {
        socket.volatile.emit('newMessage', message, (response) => {
          console.log(response);
        });
      }, 1000); */
      /* socket.volatile.emit('newMessage', message, (response) => {
        console.log(response);
      }); */
      // hadnleSocketEmit(, message);
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
