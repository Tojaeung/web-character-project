import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { NotificationType } from '@src/types/index';

interface NotificationSliceType {
  ok: boolean;
  message: string | null;
  notifications: NotificationType[] | null;
}

const initialState: NotificationSliceType = {
  ok: false,
  message: null,
  notifications: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    initNotification: (
      state,
      action: PayloadAction<{ ok: boolean; message: string; notifications: NotificationType[] }>
    ) => {
      state.ok = action.payload.ok;
      state.message = action.payload.message;
      state.notifications = action.payload.notifications;
    },
    addNotification: (
      state,
      action: PayloadAction<{ ok: boolean; message: string; newNotification: NotificationType }>
    ) => {
      state.ok = action.payload.ok;
      state.message = action.payload.message;
      if (state.notifications?.length === 20) {
        state.notifications.splice(19);
        state.notifications.unshift(action.payload.newNotification);
        return;
      }
      state.notifications?.unshift(action.payload.newNotification);
    },
    getNotification: (
      state,
      action: PayloadAction<{ ok: boolean; message: string; notifications: NotificationType[] }>
    ) => {
      state.ok = action.payload.ok;
      state.message = action.payload.message;
      state.notifications = action.payload.notifications;
    },

    updateNotification: (
      state,
      action: PayloadAction<{ ok: boolean; message: string; updatedNotification: NotificationType }>
    ) => {
      state.ok = action.payload.ok;
      state.message = action.payload.message;
      const index = state.notifications?.findIndex(
        (notification) => notification.id === action.payload.updatedNotification.id
      );
      state.notifications?.splice(index as number, 1, action.payload.updatedNotification);
    },
  },
});

export const { initNotification, addNotification, getNotification, updateNotification } = notificationSlice.actions;
export const selectNotificationOk = (state: RootState) => state.notification.ok;
export const selectNotificationMessage = (state: RootState) => state.notification.message;
export const selectNotificationNotifications = (state: RootState) => state.notification.notifications;

export default notificationSlice.reducer;
