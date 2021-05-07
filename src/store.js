import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './components/channels/channelsSlice.js';
import messagesReducer from './components/messages/messagesSlice.js';

export default () => {
  const store = configureStore({
    reducer: {
      channelsData: channelsReducer,
      messagesData: messagesReducer,
    },
  });

  return store;
};
