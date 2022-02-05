import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface ChatType {
  chatList: { nickname: string; avatar: string; connected: string }[];
}

const initialState: ChatType = {
  chatList: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    initChatList: (state, action) => {
      state.chatList = action.payload.newChatList;
    },
    addChat: (state, action) => {
      state.chatList.unshift(action.payload.newChat);
    },
  },
  extraReducers: {},
});

export const { initChatList, addChat } = chatSlice.actions;
export const selectChatList = (state: RootState) => state.chat.chatList;

export default chatSlice.reducer;
