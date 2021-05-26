/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice.js';

export default createSlice({
  name: 'messagesData',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      state.messages.push(message);
    },
  },
  extraReducers: {
    [channelsSlice.actions.initChannels]: (state, action) => {
      const { messages } = action.payload.data;
      state.messages = messages;
    },
    [channelsSlice.actions.removeChannel]: (state, action) => {
      const { id } = action.payload;
      const newMessages = state.messages.filter((message) => message.channelId !== id);
      state.messages = newMessages;
    },
  },
});
