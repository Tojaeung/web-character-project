import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT as string, {
  autoConnect: false,
  transports: ['websocket'],
  withCredentials: true,
});

export default socket;
