import channelsSlice from './channelsSlice.js';
import messagesSlice from './messagesSlice.js';
import modalsSlice from './modalsSlice.js';

export * from './selectors.js';

export const actions = {
  ...channelsSlice.actions,
  ...messagesSlice.actions,
  ...modalsSlice.actions,
};

export const channelsReducer = channelsSlice.reducer;
export const messagesReducer = messagesSlice.reducer;
export const modalsReducer = modalsSlice.reducer;
