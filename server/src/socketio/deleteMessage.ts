import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';
import parseMessages from '@src/socketio/parseMessages';

const deleteMessage = async (socket: SessionSocket, chatId: string) => {
  const user = socket.request.session.user;

  const messages = await redisClient.lrange(`messages:${user.id}`, 0, -1);
  await redisClient.del(`messages:${user.id}`);

  const parsedMessages = await parseMessages(messages);
  // console.log(parsedMessages);

  const newMessages = parsedMessages
    .filter((parsedMessage) => parsedMessage.from !== chatId)
    .filter((parsedMessage) => parsedMessage.to !== chatId);

  if (newMessages.length === 0) {
    socket.emit('initMessages', undefined);
    return;
  }

  if (newMessages.length > 0) {
    for (const newMessage of newMessages) {
      const newMessageStr = [newMessage.type, newMessage.to, newMessage.from, newMessage.content, newMessage.date].join(
        ','
      );

      await redisClient.lpush(`messages:${user.id}`, newMessageStr);
    }

    socket.emit('initMessages', newMessages);
    return;
  }
};

export default deleteMessage;
