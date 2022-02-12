import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface ChatType {
  ok: boolean;
  chatUser: { id: string; nickname: string; avatar: string } | undefined;
  chats: { id: string; nickname: string; avatar: string }[];
  messages: {
    type: string;
    to: string;
    from: string;
    content: string;
    date: string;
  }[];
  msgNotis: { from: string; to: string }[];
}

const initialState: ChatType = {
  ok: false,
  chatUser: undefined,
  chats: [],
  messages: [],
  msgNotis: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChatModal: (state) => {
      state.ok = true;
    },
    closeChatModal: (state) => {
      state.ok = false;
    },
    isChatUser: (state, action) => {
      state.chatUser = action.payload.chatUser;
    },
    initChats: (state, action) => {
      state.chats = action.payload.newChats;
    },
    addChat: (state, action) => {
      state.chats.unshift(action.payload.newChat);
    },
    initMessages: (state, action) => {
      state.messages = action.payload.newMessages;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload.newMessage);
    },
    initMsgNotis: (state, action) => {
      state.msgNotis = action.payload.newMsgNotis;
    },
    addMsgNoti: (state, action) => {
      state.msgNotis.unshift(action.payload.newMsgNoti);
    },
  },
  extraReducers: {},
});

export const {
  openChatModal,
  closeChatModal,
  isChatUser,
  initChats,
  addChat,
  initMessages,
  addMessage,
  initMsgNotis,
  addMsgNoti,
} = chatSlice.actions;

export const selectChatOk = (state: RootState) => state.chat.ok;
export const selectChatUser = (state: RootState) => state.chat.chatUser;
export const selectChats = (state: RootState) => state.chat.chats;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectMsgNotis = (state: RootState) => state.chat.msgNotis;

export default chatSlice.reducer;
