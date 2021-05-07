import React from 'react';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';

import App from './components/App.jsx';
import createStore from './store.js';
import resources from './locales/ru.js';
import { addMessage } from './components/messages/messagesSlice.js';
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

  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </Provider>
  );
};
