import { Server, Socket } from 'socket.io';
import { SessionSocket } from '@interfaces/index';
import initUser from '@socketio/initUser';
import addChat from '@socketio/chat/addChat';
import addMessage from '@socketio/chat/addMessage';
import addMessageNoti from '@socketio/chat/addMessageNoti';
import deleteMessageNoti from '@socketio/chat/deleteMessageNoti';
import deleteChat from '@socketio/chat/deleteChat';
import deleteMessage from '@socketio/chat/deleteMessage';

import addNotification from '@socketio/notification/addNotification';
import getNotification from '@socketio/notification/getNotification';
import updateNotification from '@socketio/notification/updateNotification';
import updateAllNotifications from '@socketio/notification/updateAllNotifications';
import deleteAllNotifications from '@socketio/notification/deleteAllNotifications';

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
