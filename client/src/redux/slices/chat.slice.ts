import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface ChatType {
  chats: { id: string; nickname: string; avatar: string }[];
}

const initialState: ChatType = {
  chats: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    initChats: (state, action) => {
      state.chats = action.payload.newChats;
    },
    addChat: (state, action) => {
      state.chats.unshift(action.payload.newChat);
    },
  },
  extraReducers: {},
});

export const { initChats, addChat } = chatSlice.actions;
export const selectChats = (state: RootState) => state.chat.chats;

export default chatSlice.reducer;
