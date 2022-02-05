import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface MsgNotiType {
  msgNotis: { from: string; to: string }[];
}

const initialState: MsgNotiType = {
  msgNotis: [],
};

export const msgNotiSlice = createSlice({
  name: 'msgNoti',
  initialState,
  reducers: {
    initMsgNotis: (state, action) => {
      state.msgNotis = action.payload.newMsgNotis;
    },
    addMsgNoti: (state, action) => {
      state.msgNotis.unshift(action.payload.newMsgNoti);
    },
  },
  extraReducers: {},
});

export const { initMsgNotis, addMsgNoti } = msgNotiSlice.actions;
export const selectMsgNotis = (state: RootState) => state.msgNoti.msgNotis;

export default msgNotiSlice.reducer;
