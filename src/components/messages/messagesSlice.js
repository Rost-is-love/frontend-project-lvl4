/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { initChannels } from '../channels/channelsSlice.js';

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
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
