/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux';

export const getChannels = () => useSelector((state) => state.channelsData.channels);
export const getCurChannelId = () => useSelector((state) => state.channelsData.currentChannelId);
export const getChannelId = () => useSelector((state) => state.modalsData.channelId);
export const getMessages = () => useSelector((state) => state.messagesData.messages);
export const getIsVisible = () => useSelector((state) => state.modalsData.isVisible);
export const getModalType = () => useSelector((state) => state.modalsData.type);
