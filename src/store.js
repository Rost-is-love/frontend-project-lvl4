import { combineReducers } from 'redux';
import { channelsReducer, messagesReducer, modalsReducer } from './slices/index.js';

export default combineReducers({
  channelsData: channelsReducer,
  messagesData: messagesReducer,
  modalsData: modalsReducer,
});
