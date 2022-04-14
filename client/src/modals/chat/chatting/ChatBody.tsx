import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import styled, { css } from 'styled-components';
import 'moment/locale/ko';
import relativeTime from '@src/utils/date.util';
import { useAppSelector } from '@src/store/app/hook';
import { selectChatUser, selectMessages } from '@src/store/slices/chat.slice';

function ChatBody() {
  const messages = useAppSelector(selectMessages);
  const chatUser = useAppSelector(selectChatUser);

  // 새로운 메세지 추가, 대화상대 바뀔때마다 스크롤 하단으로 내리기
  const messageBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatUser]);

  return (
    <Container>
      {chatUser &&
        messages.length > 0 &&
        messages
          .filter((message) => message.to === chatUser.chatId || message.from === chatUser.chatId)
          .map((message) => {
            return (
              <MessageBox type={message.to === chatUser.chatId ? 'sent' : 'received'} key={v4()}>
                <Message type={message.to === chatUser.chatId ? 'sent' : 'received'}>
                  {message.type === 'text' ? (
                    <TextMessage>{message.content}</TextMessage>
                  ) : (
                    <Image src={message.content} alt="이미지" />
                  )}
                </Message>
                <div>{relativeTime(message.date)}</div>
              </MessageBox>
            );
          })}
      <div ref={messageBoxRef} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  min-height: 60rem;
  max-height: 60rem;
  overflow-y: scroll;
`;
const MessageBox = styled.div<{ type: string }>`
  ${({ type }) => {
    if (type === 'sent') {
      return css`
        width: 100%;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        background-color: ${({ theme }) => theme.palette.white};
        margin-bottom: 0.2rem;
      `;
    } else {
      return css`
        width: 100%;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        background-color: ${({ theme }) => theme.palette.white};
        margin-bottom: 0.2rem;
      `;
    }
  }}
`;
const Message = styled.div<{ type: string }>`
  ${({ type }) => {
    if (type === 'sent') {
      return css`
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        background-color: ${({ theme }) => theme.palette.green};
        border-radius: 10px;
      `;
    } else {
      return css`
        padding: 1rem;
        display: flex;
        background-color: ${({ theme }) => theme.palette.red};
        border-radius: 10px;
        justify-content: flex-start;
      `;
    }
  }}
`;

const TextMessage = styled.div`
  font-size: 1.2rem;
  white-space: pre-wrap;
  word-break: break-all;
`;
const Image = styled.img``;

export default ChatBody;
