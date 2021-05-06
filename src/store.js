import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './components/channels/channelsSlice.js';

export default () => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
    },
  });

  return store;
};
