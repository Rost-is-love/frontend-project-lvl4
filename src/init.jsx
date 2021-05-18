import React from 'react';
import i18next from 'i18next';
import * as yup from 'yup';
import { Provider } from 'react-redux';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import getLogger from '../lib/logger.js';

import App from './components/App.jsx';
import createStore from './store.js';
import resources from './locales/ru.js';
import { addMessage } from './components/messages/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './components/channels/channelsSlice.js';
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

  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </SocketContext.Provider>
    </Provider>
  );
};
