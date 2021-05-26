/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// prettier-ignore
export const channelsSlice = createSlice({
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
      state.currentChannelId = channel.id;
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = 1;
    },
    renameChannel: (state, { payload: { id, name } }) => {
      state.channels = state.channels
        .map((channel) => (channel.id === id ? { ...channel, name } : channel));
    },
    changeCurrentChannel: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
  },
});
// prettier-ignore
export const {
  initChannels,
  addChannel,
  removeChannel,
  renameChannel,
  changeCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
