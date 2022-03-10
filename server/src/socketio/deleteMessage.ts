import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';
import parseMessages from '@src/socketio/parseMessages';

const deleteMessage = async (socket: SessionSocket, chatId: string) => {
  const user = socket.request.session.user;

  const messages = await cluster.lrange(`messages:${user.userId}`, 0, -1);
  await cluster.del(`messages:${user.userId}`);

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

      await cluster.lpush(`messages:${user.userId}`, newMessageStr);
    }

    socket.emit('initMessages', newMessages);
    return;
  }
};

export default deleteMessage;
