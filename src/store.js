import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import modalsReducer from './slices/modalsSlice.js';

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
