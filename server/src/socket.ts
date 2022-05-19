import { Server, Socket } from 'socket.io';
import { SessionSocket } from '@src/types';
import initUser from '@src/socketio/initUser';
import addChat from '@src/socketio/chat/addChat';
import addMessage from '@src/socketio/chat/addMessage';
import addMessageNoti from '@src/socketio/chat/addMessageNoti';
import deleteMessageNoti from '@src/socketio/chat/deleteMessageNoti';
import deleteChat from '@src/socketio/chat/deleteChat';
import deleteMessage from '@src/socketio/chat/deleteMessage';

import addNotification from '@src/socketio/notification/addNotification';
import getNotification from '@src/socketio/notification/getNotification';
import updateNotification from '@src/socketio/notification/updateNotification';
import updateAllNotifications from '@src/socketio/notification/updateAllNotifications';
import deleteAllNotifications from '@src/socketio/notification/deleteAllNotifications';

const socket = ({ io }: { io: Server }) => {
  io.on('connect', async (defaultSocket: Socket) => {
    const socket = <SessionSocket>defaultSocket;
    console.log(`${socket.request.session.user.id}님 입장`);

    initUser(socket);

    // 채팅
    socket.on('addChat', (chatId) => {
      addChat(socket, chatId);
    });

    socket.on('addMessage', (messageObj) => {
      addMessage(socket, messageObj);
    });

    socket.on('addMessageNoti', (messageNoti) => {
      addMessageNoti(socket, messageNoti);
    });

    socket.on('deleteMessageNoti', (chatId) => {
      deleteMessageNoti(socket, chatId);
    });

    socket.on('deleteChat', (chatId) => {
      deleteChat(socket, chatId);
    });

    socket.on('deleteMessage', (chatId) => {
      deleteMessage(socket, chatId);
    });

    // 알림
    socket.on('addNotification', (addNotificationObj) => {
      addNotification(socket, addNotificationObj);
    });

    socket.on('getNotification', () => {
      getNotification(socket);
    });

    socket.on('updateNotification', (notificationId) => {
      updateNotification(socket, notificationId);
    });

    socket.on('updateAllNotifications', () => {
      updateAllNotifications(socket);
    });

    socket.on('deleteAllNotifications', () => {
      deleteAllNotifications(socket);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.request.session.user.id}님 퇴장`);
    });
  });
};

export default socket;
