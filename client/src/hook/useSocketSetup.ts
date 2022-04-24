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
  initMsgNotis,
  addMsgNoti,
  openChatModal,
} from '@src/store/slices/chat.slice';

const useSocketSetup = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserUser);

  useEffect(() => {
    // 비로그인 새로고침시, 소켓세션정보 생성 시도를 막아준다.
    if (!user) return;
    socket.connect();

    socket.on('initChats', async (parsedChats) => {
      await dispatch(initChats({ newChats: parsedChats }));
    });

    socket.on('initMessages', async (parsedMessages) => {
      await dispatch(initMessages({ newMessages: parsedMessages }));
    });

    socket.on('initMsgNotis', async (parsedMsgNotis) => {
      await dispatch(initMsgNotis({ newMsgNotis: parsedMsgNotis }));
    });

    socket.on('addChat', async (result) => {
      const { ok, message, newChat } = result;
      if (!ok) return alert(message);
      message && alert(message);
      await dispatch(addChat({ newChat }));
      await dispatch(openChatModal());
    });

    socket.on('addMessage', async (newMessage) => {
      await dispatch(addMessage({ newMessage: newMessage }));
    });

    socket.on('addMsgNoti', async (newMsgNoti) => {
      await dispatch(addMsgNoti({ newMsgNoti: newMsgNoti }));
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
      socket.off('addMsgNoti');
      socket.off('connect_error');
    };
  }, []);
};

export default useSocketSetup;
