import moment from 'moment';
import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';
import parseMessages from '@src/socketio/chat/parseMessages';
import s3Delete from '@src/utils/s3.utils';
import logger from '@src/helpers/winston.helper';

const deleteMessage = async (socket: SessionSocket, chatId: string) => {
  const user = socket.request.session.user;

  const messages = await cluster.lrange(`messages:${user.chatId}`, 0, -1);
  await cluster.del(`messages:${user.chatId}`);

  // 나의 메세지가 하나도 없을때 아래 과정을 생략한다.
  if (!messages.length) return;

  // 이미지 파일, 대화상대만 key 정보를 불러옴
  const parsedMessages = await parseMessages(messages);

  // s3에 저장된 객체를 삭제하기 위해서 이미지메세지만 추려낸다.
  const imageMessages = parsedMessages
    .filter((parsedMessage) => parsedMessage.from === chatId || parsedMessage.to === chatId)
    .filter((parsedMessage) => parsedMessage.type === 'image');

  // s3 객체삭제
  if (imageMessages.length > 0) imageMessages.forEach(async (imageMessage) => await s3Delete(imageMessage.imgKey));

  // 상대에게 내가 대화방에 나갔다는것을 알리기 위해 가이드 메세지(type='endChat')를 상대방에게 보낸다.
  // 가이드 메세지를 보내기전에, 내가 대화방을 나갈때 상대방이 먼저 대화방을 나갔는지 확인이 필요하다.
  // 상대방이 먼저 대화방을 나갔다면(나의 메세지 목록에 가이드메세지가 있다.) 상대방에게 또 가이드 메세지를 보낼필요가 없다.
  const isEndGuideMessage = parsedMessages
    .filter((parsedMessage) => parsedMessage.from === chatId || parsedMessage.to === chatId)
    .some((parsedMessage) => parsedMessage.type === 'endChat');

  // 대화를 보내야 비로소 상대방의 채팅목록에 내가 추가 된다.
  // 대화가 없었던 채팅방에 굳이 채팅종료 안내를 할 필요가 없기 때문에 대화상대와 대화이력이 있는지 확인한다.
  const isMessageWithChatUser = parsedMessages.some(
    (parsedMessage) => parsedMessage.from === chatId || parsedMessage.to === chatId
  );

  // 나의 대화목록에 가이드메세지(대화끝..)가 없다면 상대방에게 내가 대화방을 나갔다는 가이드 메세지를 보낸다.
  if (!isEndGuideMessage && isMessageWithChatUser) {
    const guideMessage = {
      type: 'endChat',
      to: chatId,
      from: user.chatId,
      content: '채팅상대가 나갔습니다.\n 더이상 채팅을 할 수 없습니다.',
      date: moment().format(),
    };

    const guideMessageStr = [
      guideMessage.type,
      guideMessage.to,
      guideMessage.from,
      guideMessage.content,
      guideMessage.date,
    ].join(',');
    await cluster.rpush(`messages:${chatId}`, guideMessageStr);

    socket.to(chatId).emit('addMessage', guideMessage);
  }

  // 대화상대와의 메세지들을 삭제한다.
  const newMessages = parsedMessages
    .filter((parsedMessage) => parsedMessage.from !== chatId)
    .filter((parsedMessage) => parsedMessage.to !== chatId);

  // 대화 상대와의 메세지를 제외하고도 메세지가 없다면 빈배열[]을 리턴해준다.
  if (!newMessages.length) return socket.emit('initMessages', newMessages);

  // 업데이트되 메세지 객체를 다시 str으로 만들고 레디스 리스트를 새로 생성한다.
  for (const newMessage of newMessages) {
    const newMessageStr = [newMessage.type, newMessage.to, newMessage.from, newMessage.content, newMessage.date].join(
      ','
    );
    await cluster.lpush(`messages:${user.chatId}`, newMessageStr);
  }

  socket.emit('initMessages', newMessages);
  return;
};

export default deleteMessage;
