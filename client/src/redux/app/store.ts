import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/auth.slice';
import chatSlice from '../slices/chat.slice';
import messageSlice from '../slices/message.slice';
import notiSlicse from '../slices/msgNoti.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    message: messageSlice,
    msgNoti: notiSlicse,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
