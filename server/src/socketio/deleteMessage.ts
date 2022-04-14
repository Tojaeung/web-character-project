import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';
import parseMessages from '@src/socketio/parseMessages';
import { s3 } from '@src/helpers/s3.helper';
import logger from '@src/helpers/winston.helper';

const deleteMessage = async (socket: SessionSocket, chatId: string) => {
  const user = socket.request.session.user;

  const messages = await cluster.lrange(`messages:${user.chatId}`, 0, -1);
  await cluster.del(`messages:${user.chatId}`);

  // 이미지 파일, 대화상대만 key 정보를 불러옴
  const parsedMessages = await parseMessages(messages);

  // s3에 저장된 객체를 삭제하기 위해서 이미지메세지만 추려낸다.
  const imageMessages = parsedMessages
    .filter((parsedMessage) => parsedMessage.from || parsedMessage.to === chatId)
    .filter((parsedMessage) => parsedMessage.type === 'image');

  if (imageMessages.length > 0) {
    // s3 객체삭제
    const bucketName = process.env.AWS_BUCKET_NAME as string;
    for (const imageMessage of imageMessages) {
      s3.deleteObject({ Bucket: bucketName, Key: imageMessage.imgKey as string }, (err) => {
        if (err) {
          logger.warn('s3 아바타 객체삭제를 실패하였습니다.');
        }
      });
    }
  }

  // 대화상대와의 메세지들을 삭제한다.
  const newMessages = parsedMessages
    .filter((parsedMessage) => parsedMessage.from !== chatId)
    .filter((parsedMessage) => parsedMessage.to !== chatId);

  if (newMessages.length === 0) {
    socket.emit('initMessages', undefined);
    return;
  }

  // 업데이트되 메세지 객체를 다시 str으로 만들고 레디스 리스트를 새로 생성한다.
  if (newMessages.length > 0) {
    for (const newMessage of newMessages) {
      const newMessageStr = [newMessage.type, newMessage.to, newMessage.from, newMessage.content, newMessage.date].join(
        ','
      );
      await cluster.lpush(`messages:${user.chatId}`, newMessageStr);
    }

    socket.emit('initMessages', newMessages);
    return;
  }
};

export default deleteMessage;
