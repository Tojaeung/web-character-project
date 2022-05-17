import { Server, Socket } from 'socket.io';
import { SessionSocket } from '@src/types';
import initUser from '@src/socketio/initUser';
import addChat from '@src/socketio/chat/addChat';
import addMessage from '@src/socketio/chat/addMessage';
import addMsgNoti from '@src/socketio/chat/addMsgNoti';
import deleteMsgNoti from '@src/socketio/chat/deleteMsgNoti';
import deleteChat from '@src/socketio/chat/deleteChat';
import deleteMessage from '@src/socketio/chat/deleteMessage';
import updateLastMessage from '@src/socketio/chat/updateLastMessage';

import addCommentNoti from '@src/socketio/notification/addCommentNoti';
import addLikeNoti from '@src/socketio/notification/addLikeNoti';
import addPenaltyNoti from '@src/socketio/notification/addPenaltyNoti';
import getNotification from '@src/socketio/notification/getNotification';
import updateNotification from '@src/socketio/notification/updateNotification';

const socket = ({ io }: { io: Server }) => {
  io.on('connect', async (defaultSocket: Socket) => {
    const socket = <SessionSocket>defaultSocket;
    console.log(`${socket.request.session.user.id}님 입장`);

    initUser(socket);

    // socket.on('initUser', () => {
    //   initUser(socket);
    // });

    // 채팅
    socket.on('addChat', (chatId) => {
      addChat(socket, chatId);
    });

    socket.on('addMessage', (msgObj) => {
      addMessage(socket, msgObj);
    });

    socket.on('addMsgNoti', (msgNoti) => {
      addMsgNoti(socket, msgNoti);
    });

    socket.on('deleteMsgNoti', (chatId) => {
      deleteMsgNoti(socket, chatId);
    });

    socket.on('deleteChat', (chatId) => {
      deleteChat(socket, chatId);
    });

    socket.on('deleteMessage', (chatId) => {
      deleteMessage(socket, chatId);
    });

    socket.on('updateLastMessage', async () => {
      updateLastMessage(socket);
    });

    // 알림
    socket.on('addCommentNoti', (commentNotiObj) => {
      addCommentNoti(socket, commentNotiObj);
    });

    socket.on('addLikeNoti', (likeNotiObj) => {
      addLikeNoti(socket, likeNotiObj);
    });

    socket.on('addPenaltyNoti', (penaltyNotiObj) => {
      addPenaltyNoti(socket, penaltyNotiObj);
    });

    socket.on('getNotification', () => {
      getNotification(socket);
    });

    socket.on('updateNotification', (notificationId) => {
      updateNotification(socket, notificationId);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.request.session.user.id}님 퇴장`);
    });
  });
};

export default socket;
