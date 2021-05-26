/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'modalsData',
  initialState: {
    type: null,
    isVisible: false,
    channelId: null,
  },
  reducers: {
    showModal: (state, { payload: { type, channelId } }) => {
      state.type = type;
      state.isVisible = true;
      state.channelId = channelId;
    },
    hideModal: (state) => {
      state.type = null;
      state.isVisible = false;
      state.hannelId = null;
    },
  },
});
