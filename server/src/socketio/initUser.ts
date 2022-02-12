import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';
import parseChats from './parseChats';
import parseMessages from './parseMessages';
import parseMsgNotis from './parseMsgNotis';

const initUser = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  // 자신의 대화상대를 업데이트 시킨다.
  const chats = await redisClient.lrange(`chats:${user.id}`, 0, -1);
  const parsedChats = await parseChats(chats);
  socket.emit('initChats', parsedChats);

  // 자신의 메세지를 업데이트 시킨다.
  const messages = await redisClient.lrange(`messages:${user.id}`, 0, -1);
  const parsedMessages = await parseMessages(messages);
  socket.emit('initMessages', parsedMessages);

  // 자신의 메세지알림을 업데이트 시킨다.
  const msgNotis = await redisClient.lrange(`msgNotis:${user.id}`, 0, -1);
  const parsedMsgNotis = await parseMsgNotis(msgNotis);
  socket.emit('initMsgNotis', parsedMsgNotis);
};

export default initUser;
