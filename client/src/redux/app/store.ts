import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/auth.slice';
import chatSlice from '../slices/chat.slice';
import profileSlice from '../slices/profile.slice';
import modalSlice from '../slices/modal.slice';
import photoSlice from '../slices/photo.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    profile: profileSlice,
    modal: modalSlice,
    photo: photoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
