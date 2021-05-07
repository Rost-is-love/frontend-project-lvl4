/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsData',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    initChannels: (state, { payload: { data } }) => {
      const { channels, currentChannelId } = data;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    addChannel: (state, { payload: { channel } }) => {
      state.channels.push(channel);
    },
  },
});

export const { initChannels, addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
