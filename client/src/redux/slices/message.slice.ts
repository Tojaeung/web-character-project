import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface MessageType {
  messages: {
    type: string;
    to: string;
    from: string;
    content: string;
    date: string;
  }[];
}

const initialState: MessageType = {
  messages: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    initMessages: (state, action) => {
      state.messages = action.payload.newMessages;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload.newMessage);
    },
  },
  extraReducers: {},
});

export const { initMessages, addMessage } = messageSlice.actions;
export const selectMessages = (state: RootState) => state.message.messages;

export default messageSlice.reducer;
