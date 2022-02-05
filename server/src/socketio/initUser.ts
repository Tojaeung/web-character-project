import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';
import parseChatList from './parseChatList';
import parseMessageList from './parseMessageList';
import parseMsgNotis from './parseMsgNotis';

const initUser = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  // 자신의 chatList를 업데이트 시킨다.
  const chatList = await redisClient.lrange(`chats:${user.nickname}`, 0, -1);
  const parsedChatList = await parseChatList(chatList);
  socket.emit('initChatList', parsedChatList);

  const msgList = await redisClient.lrange(`messages:${user.nickname}`, 0, -1);
  const parsedMessageList = await parseMessageList(msgList);
  socket.emit('initMessageList', parsedMessageList);

  const msgNotis = await redisClient.lrange(`msgNotis:${user.nickname}`, 0, -1);
  const parsedMsgNotis = await parseMsgNotis(msgNotis);
  socket.emit('initMsgNotis', parsedMsgNotis);
};

export default initUser;
