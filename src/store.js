import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './components/channels/channelsSlice.js';
import messagesReducer from './components/messages/messagesSlice.js';
import modalsReducer from './components/modals/modalsSlice.js';

export default () => {
  const store = configureStore({
    reducer: {
      channelsData: channelsReducer,
      messagesData: messagesReducer,
      modalsData: modalsReducer,
    },
  });

  return store;
};
