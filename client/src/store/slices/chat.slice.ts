import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { ChatUserType, MessageType, MsgNotiType } from '@src/store/types/chat.type';

interface ChatType {
  ok: boolean;
  isChatUser: ChatUserType | null;
  chats: ChatUserType[];
  messages: MessageType[];
  msgNotis: MsgNotiType[];
}

const initialState: ChatType = {
  ok: false,
  isChatUser: null,
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
    selectChatUser: (state, action) => {
      state.isChatUser = action.payload.selectedChatUser;
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
  selectChatUser,
  initChats,
  addChat,
  initMessages,
  addMessage,
  initMsgNotis,
  addMsgNoti,
} = chatSlice.actions;

export const selectChatOk = (state: RootState) => state.chat.ok;
export const selectChatIsChatUser = (state: RootState) => state.chat.isChatUser;
export const selectChats = (state: RootState) => state.chat.chats;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectMsgNotis = (state: RootState) => state.chat.msgNotis;

export default chatSlice.reducer;
