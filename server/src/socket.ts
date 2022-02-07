import { Server, Socket } from 'socket.io';
import { SessionSocket } from '@src/types';
import initUser from '@src/socketio/initUser';
import addChat from '@src/socketio/addChat';
import addMessage from '@src/socketio/addMessage';
import addMsgNoti from '@src/socketio/addMsgNoti';
import deleteMsgNoti from '@src/socketio/deleteMsgNoti';
import deleteUser from '@src/socketio/deleteUser';
import onDisconnect from '@src/socketio/onDisconnect';

const socket = ({ io }: { io: Server }) => {
  io.on('connect', async (defaultSocket: Socket) => {
    const socket = <SessionSocket>defaultSocket;
    console.log('nickname', `${socket.request.session.user.nickname}님 입장`);

    initUser(socket);

    socket.on('addChat', (chatNickname, cb) => {
      addChat(socket, chatNickname, cb);
    });

    socket.on('addMessage', (msgObj, cb) => {
      addMessage(socket, msgObj, cb);
    });

    socket.on('addMsgNoti', (msgNoti) => {
      addMsgNoti(socket, msgNoti);
    });

    socket.on('deleteMsgNoti', (obj) => {
      deleteMsgNoti(socket, obj);
    });

    socket.on('deleteUser', () => {
      deleteUser(socket);
    });

    socket.on('disconnect', () => {
      console.log('nickname', `${socket.request.session.user.nickname}님 퇴장`);
      onDisconnect(socket);
    });
  });
};

export default socket;
