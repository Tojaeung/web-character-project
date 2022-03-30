import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/auth.slice';
import chatSlice from '../slices/chat.slice';
import profileSlice from '../slices/profile.slice';
import modalSlice from '../slices/modal.slice';
import drawingSlice from '../slices/drawing.slice';
import boardSlice from '../slices/board.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    profile: profileSlice,
    modal: modalSlice,
    drawing: drawingSlice,
    board: boardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
