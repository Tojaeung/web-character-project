import { useEffect } from 'react';
import socket from '@src/utils/socket';
import { useAppDispatch } from '@src/redux/app/hook';
import { logoutUser } from '@src/redux/requests/auth.request';
import { addChat, initChatList } from '@src/redux/slices/chat.slice';
import { initMessageList, addMessage } from '@src/redux/slices/message.slice';
import { initMsgNotis, addMsgNoti } from '@src/redux/slices/msgNoti.slice';

export const useSocketSetup = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();

    socket.on('initChatList', async (parsedChatList) => {
      if (!parsedChatList) {
        await dispatch(initChatList({ newChatList: [] }));
        return;
      }
      await dispatch(initChatList({ newChatList: parsedChatList }));
    });

    socket.on('initMessageList', async (parsedMessageList) => {
      if (!parsedMessageList) {
        await dispatch(initMessageList({ newMessageList: [] }));
        return;
      }
      await dispatch(initMessageList({ newMessageList: parsedMessageList }));
    });

    socket.on('initMsgNotis', async (parsedMsgNotis) => {
      if (!parsedMsgNotis) {
        await dispatch(initMsgNotis({ newMsgNotis: [] }));
        return;
      }
      await dispatch(initMsgNotis({ newMsgNotis: parsedMsgNotis }));
    });

    socket.on('addChat', async (newChat) => {
      await dispatch(addChat({ newChat }));
    });

    socket.on('addMessage', async (msgObj) => {
      await dispatch(addMessage({ newMessage: msgObj }));
    });

    socket.on('addMsgNoti', async (msgNoti) => {
      await dispatch(addMsgNoti({ newMsgNoti: msgNoti }));
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
      socket.off('addNoti');
      socket.off('connect_error');
    };
  }, []);
};
