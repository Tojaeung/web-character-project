import { useEffect } from 'react';
import socket from '@src/utils/socket';
import { useAppDispatch } from '@src/redux/app/hook';
import { logoutUser } from '@src/redux/requests/auth.request';
import { addChat, initChats, initMessages, addMessage, initMsgNotis, addMsgNoti } from '@src/redux/slices/chat.slice';

export const useSocketSetup = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();

    socket.on('initChats', async (parsedChats) => {
      if (!parsedChats) {
        await dispatch(initChats({ newChats: [] }));
        return;
      }
      await dispatch(initChats({ newChats: parsedChats }));
    });

    socket.on('initMessages', async (parsedMessages) => {
      if (!parsedMessages) {
        await dispatch(initMessages({ newMessages: [] }));
        return;
      }
      await dispatch(initMessages({ newMessages: parsedMessages }));
    });

    socket.on('initMsgNotis', async (parsedMsgNotis) => {
      if (!parsedMsgNotis) {
        await dispatch(initMsgNotis({ newMsgNotis: [] }));
        return;
      }
      await dispatch(initMsgNotis({ newMsgNotis: parsedMsgNotis }));
    });

    socket.on('addChat', async (result) => {
      const { ok, message, newChat } = result;
      if (!ok) return alert(message);
      alert(message);
      await dispatch(addChat({ newChat }));
    });

    socket.on('addMessage', async (newMessage) => {
      await dispatch(addMessage({ newMessage: newMessage }));
    });

    socket.on('addMsgNoti', async (newMsgNoti) => {
      await dispatch(addMsgNoti({ newMsgNoti: newMsgNoti }));
    });

    socket.on('connect_error', async () => {
      await dispatch(logoutUser());
      alert('예기치 않은 오류로 로그아웃 되었습니다.');
    });

    return () => {
      socket.off('connected');
      socket.off('initChatList');
      socket.off('initMessageList');
      socket.off('initNotiList');
      socket.off('addChat');
      socket.off('addMessage');
      socket.off('addMsgNoti');
      socket.off('connect_error');
    };
  }, []);
};
