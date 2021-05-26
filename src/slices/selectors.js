import { createSelector } from '@reduxjs/toolkit';

export const selectIsVisible = (state) => state.modalsData.isVisible;
export const selectModalType = (state) => state.modalsData.type;

export const selectChannels = (state) => state.channelsData.channels;
export const selectCurChannelId = (state) => state.channelsData.currentChannelId;
export const selectChannelId = (state) => state.modalsData.channelId;
// prettier-ignore
export const selectChannelsNames = createSelector([selectChannels],
  (channels) => channels.map((channel) => channel.name));

const selectAllMessages = (state) => state.messagesData.messages;
export const selectMessages = createSelector(
  [selectAllMessages, selectCurChannelId],
  (messages, curChannelId) => messages.filter(({ channelId }) => channelId === curChannelId),
);
