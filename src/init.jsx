import React from 'react';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';

import App from './components/App.jsx';
import createStore from './store.js';
import resources from './locales/ru.js';
import { addMessage } from './components/messages/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './components/channels/channelsSlice.js';
import SocketContext from './contexts/socketContext.jsx';

export default async (socket) => {
  const store = createStore();

  i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
  });

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage({ message }));
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
        <App />
      </SocketContext.Provider>
    </Provider>
  );
};
