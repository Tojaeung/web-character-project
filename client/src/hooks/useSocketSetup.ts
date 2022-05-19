import { useEffect } from 'react';
import socket from '@src/utils/socket';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';
import { signOut } from '@src/store/requests/session.request';
import {
  addChat,
  initChats,
  initMessages,
  addMessage,
  initMessageNotis,
  addMessageNoti,
  openChatModal,
} from '@src/store/slices/chat.slice';
import {
  initNotification,
  addNotification,
  getNotification,
  updateNotification,
  updateAllNotifications,
  deleteAllNotifications,
} from '@src/store/slices/notification.slice';
import { NotificationType } from '@src/types';
import { ChatType, MessageType, MessageNotiType } from '@src/types';

const useSocketSetup = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserUser);

  useEffect(() => {
    // 비로그인 새로고침시, 소켓세션정보 생성 시도를 막아준다.
    if (!user) return;
    socket.connect();

    // 채팅
    socket.on('initChats', async (chats: ChatType[]) => {
      await dispatch(initChats({ chats }));
    });

    socket.on('initMessages', async (messages: MessageType[]) => {
      await dispatch(initMessages({ messages }));
    });

    socket.on('initMessageNotis', async (messageNotis: MessageNotiType[]) => {
      await dispatch(initMessageNotis({ messageNotis }));
    });

    socket.on('addChat', async (result: { ok: boolean; message: string; newChat?: ChatType }) => {
      const { ok, message, newChat } = result;
      if (!ok) return alert(message);
      await dispatch(addChat({ newChat }));
      await dispatch(openChatModal());
    });

    socket.on('addMessage', async (newMessage: MessageType) => {
      await dispatch(addMessage({ newMessage }));
    });

    socket.on('addMessageNoti', async (newMessageNoti: MessageNotiType) => {
      await dispatch(addMessageNoti({ newMessageNoti }));
    });

    // 알림
    socket.on(
      'initNotification',
      async (result: { ok: boolean; message: string; notifications: NotificationType[] }) => {
        await dispatch(initNotification(result));
      }
    );

    socket.on(
      'addNotification',
      async (result: { ok: boolean; message: string; newNotification?: NotificationType }) => {
        const { ok, message } = result;
        if (!ok) return alert(message);
        await dispatch(addNotification(result));
      }
    );

    socket.on(
      'getNotification',
      async (result: { ok: boolean; message: string; notifications: NotificationType[] }) => {
        await dispatch(getNotification(result));
      }
    );

    socket.on(
      'updateNotification',
      async (result: { ok: boolean; message: string; updatedNotification?: NotificationType }) => {
        const { ok, message } = result;
        if (!ok) return alert(message);
        await dispatch(updateNotification(result));
      }
    );

    socket.on('updateAllNotifications', async (result: { ok: boolean; message: string }) => {
      const { message } = result;
      await dispatch(updateAllNotifications(result));
      alert(message);
    });

    socket.on('deleteAllNotifications', async (result: { ok: boolean; message: string }) => {
      const { message } = result;
      await dispatch(deleteAllNotifications(result));
      alert(message);
    });

    socket.on('connect_error', async () => {
      await dispatch(signOut());
      socket.disconnect();
      alert('예기치 않은 오류로 로그아웃 되었습니다.');
    });

    return () => {
      socket.off('initChatList');
      socket.off('initMessageList');
      socket.off('initNotiList');
      socket.off('addChat');
      socket.off('addMessage');
      socket.off('addMessageNoti');
      socket.off('initNotification');
      socket.off('addNotification');
      socket.off('getNotification');
      socket.off('updateNotification');
      socket.off('updateAllNotifications');
      socket.off('deleteAllNotifications');
      socket.off('connect_error');
    };
  }, []);
};

export default useSocketSetup;
