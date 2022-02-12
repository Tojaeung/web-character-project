import { Server, Socket } from 'socket.io';
import { SessionSocket } from '@src/types';
import initUser from '@src/socketio/initUser';
import addChat from '@src/socketio/addChat';
import addMessage from '@src/socketio/addMessage';
import addMsgNoti from '@src/socketio/addMsgNoti';
import deleteMsgNoti from '@src/socketio/deleteMsgNoti';
import deleteUser from '@src/socketio/deleteUser';
import deleteChat from '@src/socketio/deleteChat';
import deleteMessage from '@src/socketio/deleteMessage';

const socket = ({ io }: { io: Server }) => {
  io.on('connect', async (defaultSocket: Socket) => {
    const socket = <SessionSocket>defaultSocket;
    console.log('nickname', `${socket.request.session.user.nickname}님 입장`);

    initUser(socket);

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
    // socket.on('deleteMsgNoti', (chatId) => {
    //   deleteChat(socket, chatId);
    // });

    socket.on('deleteUser', () => {
      deleteUser(socket);
    });

    socket.on('disconnect', () => {
      console.log('nickname', `${socket.request.session.user.nickname}님 퇴장`);
    });
  });
};

export default socket;
