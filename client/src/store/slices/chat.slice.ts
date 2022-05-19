import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { ChatType, MessageType, MsgNotiType } from '@src/types';

interface StateType {
  ok: boolean;
  selectedChat: ChatType | null; // 대화를 위해 선택된 유저의 정보
  chats: ChatType[]; // 대화중인 모든 대화상대들의 정보
  messages: MessageType[];
  msgNotis: MsgNotiType[];
}

const initialState: StateType = {
  ok: false,
  selectedChat: null,
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
    selectChat: (state, action: PayloadAction<{ chat: ChatType | null }>) => {
      state.selectedChat = action.payload.chat;
    },

    initChats: (state, action: PayloadAction<{ chats: ChatType[] }>) => {
      state.chats = action.payload.chats;
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
  selectChat,
  initChats,
  addChat,
  initMessages,
  addMessage,
  initMsgNotis,
  addMsgNoti,
} = chatSlice.actions;

export const selectChatOk = (state: RootState) => state.chat.ok;
export const selectChatSelectedChat = (state: RootState) => state.chat.selectedChat;
export const selectChatChats = (state: RootState) => state.chat.chats;
export const selectChatMessages = (state: RootState) => state.chat.messages;
export const selectChatMsgNotis = (state: RootState) => state.chat.msgNotis;

export default chatSlice.reducer;
