import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface MessageType {
  messageList: { type: string; to: string; from: string; content: string; date: string }[];
}

const initialState: MessageType = {
  messageList: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    initMessageList: (state, action) => {
      state.messageList = action.payload.newMessageList;
    },
    addMessage: (state, action) => {
      state.messageList.push(action.payload.newMessage);
    },
  },
  extraReducers: {},
});

export const { initMessageList, addMessage } = messageSlice.actions;
export const selectMessageList = (state: RootState) => state.message.messageList;

export default messageSlice.reducer;
