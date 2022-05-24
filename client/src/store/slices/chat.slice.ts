import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { ChatType, MessageType, MessageNotiType } from 'interfaces/index';

interface StateType {
  ok: boolean;
  selectedChat: ChatType | null; // 대화를 위해 선택된 유저의 정보
  chats: ChatType[]; // 대화중인 모든 대화상대들의 정보
  messages: MessageType[];
  messageNotis: MessageNotiType[];
}

const initialState: StateType = {
  ok: false,
  selectedChat: null,
  chats: [],
  messages: [],
  messageNotis: [],
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
    addChat: (state, action: PayloadAction<{ newChat?: ChatType }>) => {
      action.payload.newChat && state.chats.unshift(action.payload.newChat);
    },
    initMessages: (state, action: PayloadAction<{ messages: MessageType[] }>) => {
      state.messages = action.payload.messages;
    },
    addMessage: (state, action: PayloadAction<{ newMessage: MessageType }>) => {
      state.messages.push(action.payload.newMessage);
    },
    initMessageNotis: (state, action: PayloadAction<{ messageNotis: MessageNotiType[] }>) => {
      state.messageNotis = action.payload.messageNotis;
    },
    addMessageNoti: (state, action: PayloadAction<{ newMessageNoti: MessageNotiType }>) => {
      state.messageNotis.unshift(action.payload.newMessageNoti);
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
  initMessageNotis,
  addMessageNoti,
} = chatSlice.actions;

export const selectChatOk = (state: RootState) => state.chat.ok;
export const selectChatSelectedChat = (state: RootState) => state.chat.selectedChat;
export const selectChatChats = (state: RootState) => state.chat.chats;
export const selectChatMessages = (state: RootState) => state.chat.messages;
export const selectChatMessageNotis = (state: RootState) => state.chat.messageNotis;

export default chatSlice.reducer;
