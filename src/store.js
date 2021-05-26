import { combineReducers } from 'redux';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import modalsReducer from './slices/modalsSlice.js';

export default combineReducers({
  channelsData: channelsReducer,
  messagesData: messagesReducer,
  modalsData: modalsReducer,
});
