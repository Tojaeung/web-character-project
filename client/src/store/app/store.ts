import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import authSlice from '../slices/auth.slice';
import chatSlice from '../slices/chat.slice';
import modalSlice from '../slices/modal.slice';
import drawingSlice from '../slices/drawing.slice';
import boardSlice from '../slices/board.slice';
import postSlice from '../slices/post.slice';

const persistedReducer = persistReducer(
  {
    key: 'auth',
    storage,
    whitelist: ['auth'],
  },
  combineReducers({
    auth: authSlice,
    chat: chatSlice,
    modal: modalSlice,
    drawing: drawingSlice,
    board: boardSlice,
    post: postSlice,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
