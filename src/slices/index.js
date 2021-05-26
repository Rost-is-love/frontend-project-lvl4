import { channelsSlice } from './channelsSlice.js';
import { messagesSlice } from './messagesSlice.js';
import { modalsSlice } from './modalsSlice.js';

export * from './selectors.js';

export const actions = {
  ...channelsSlice.actions,
  ...messagesSlice.actions,
  ...modalsSlice.actions,
};
