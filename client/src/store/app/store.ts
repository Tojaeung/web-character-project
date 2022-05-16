import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import userSlice from '../slices/user.slice';
import chatSlice from '../slices/chat.slice';
import modalSlice from '../slices/modal.slice';
import drawingSlice from '../slices/drawing.slice';
import postSlice from '../slices/post.slice';
import notificationSlice from '../slices/notification.slice';

const persistedReducer = persistReducer(
  {
    key: 'user',
    storage,
    whitelist: ['user'],
  },
  combineReducers({
    user: userSlice,
    chat: chatSlice,
    modal: modalSlice,
    drawing: drawingSlice,
    post: postSlice,
    notification: notificationSlice,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.REACT_APP_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
