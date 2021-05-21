/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { initChannels, removeChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
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
    [initChannels]: (state, action) => {
      const { messages } = action.payload.data;
      state.messages = messages;
    },
    [removeChannel]: (state, action) => {
      const { id } = action.payload;
      const newMessages = state.messages.filter((message) => message.channelId !== id);
      state.messages = newMessages;
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
