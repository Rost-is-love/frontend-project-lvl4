/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

// prettier-ignore
export default createSlice({
  name: 'channelsData',
  initialState: {
    channels: [],
    currentChannelId: DEFAULT_CHANNEL_ID,
  },
  reducers: {
    initChannels: (state, { payload: { data } }) => {
      const { channels, currentChannelId } = data;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    addChannel: (state, { payload: { channel } }) => {
      state.channels.push(channel);
      state.currentChannelId = channel.id;
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = DEFAULT_CHANNEL_ID;
    },
    renameChannel: (state, { payload: { id, name } }) => {
      const currentChannel = state.channels.find((channel) => channel.id === id);
      currentChannel.name = name;
    },
    changeCurrentChannel: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
  },
});
