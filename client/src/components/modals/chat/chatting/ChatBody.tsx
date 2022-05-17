import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import styled, { css } from 'styled-components';
import 'moment/locale/ko';
import relativeTime from '@src/utils/date.util';
import { useAppSelector } from '@src/store/app/hook';
import { selectChatIsChatUser, selectChatMessages } from '@src/store/slices/chat.slice';

function ChatBody() {
  const messages = useAppSelector(selectChatMessages);
  const isChatUser = useAppSelector(selectChatIsChatUser);

  // 새로운 메세지 추가, 대화상대 바뀔때마다 스크롤 하단으로 내리기
  const messageBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatUser]);

  return (
    <Container>
      {isChatUser &&
        messages.length > 0 &&
        messages
          .filter((message) => message.to === isChatUser.chatId || message.from === isChatUser.chatId)
          .map((message) => {
            return (
              <MessageBox
                who={message.to === isChatUser.chatId ? 'me' : 'you'}
                isEndMessage={message.type === 'endChat' ? true : false}
                key={v4()}
              >
                <Message
                  who={message.to === isChatUser.chatId ? 'me' : 'you'}
                  isEndMessage={message.type === 'endChat' ? true : false}
                >
                  {message.type === 'text' && <TextMessage>{message.content}</TextMessage>}
                  {message.type === 'image' && <Image src={message.content} alt="이미지" />}
                  {message.type === 'endChat' && <GuideMessage>{message.content}</GuideMessage>}
                </Message>
                <MessageDate>{relativeTime(message.date!)}</MessageDate>
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
  @media ${({ theme }) => theme.device.mobile} {
    min-height: 40rem;
    max-height: 40rem;
  }
`;
const MessageBox = styled.div<{ who: string; isEndMessage: boolean }>`
  border: 1px solid;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.palette.white};
  background-color: ${({ theme }) => theme.palette.white};
  margin-bottom: 0.2rem;
  ${({ who }) => {
    if (who === 'me') {
      return css`
        align-items: flex-end;
      `;
    } else if (who === 'you') {
      return css`
        align-items: flex-start;
      `;
    }
  }}

  ${({ isEndMessage }) => {
    if (isEndMessage) {
      return css`
        align-items: center !important;
      `;
    }
  }}
`;
const Message = styled.div<{ who: string; isEndMessage: boolean }>`
  padding: 0.8rem;
  display: flex;
  border-radius: 10px;
  ${({ who }) => {
    if (who === 'me') {
      return css`
        justify-content: flex-end;
        background-color: ${({ theme }) => theme.palette.green};
      `;
    } else if (who === 'you') {
      return css`
        background-color: ${({ theme }) => theme.palette.red};
        justify-content: flex-start;
      `;
    }
  }}
  ${({ isEndMessage }) => {
    if (isEndMessage) {
      return css`
        color: ${({ theme }) => theme.palette.black} !important;
        background-color: ${({ theme }) => theme.palette.gray} !important;
        justify-content: center !important;
      `;
    }
  }}
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.6rem;
  }
`;
const TextMessage = styled.div`
  font-size: 1.3rem;
  white-space: pre-wrap;
  word-break: break-all;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;
const Image = styled.img``;

const GuideMessage = styled.div`
  font-size: 1.2rem;
  white-space: pre-wrap;
  word-break: break-all;
  text-align: center;
`;

const MessageDate = styled.div`
  color: ${({ theme }) => theme.palette.black};
`;

export default ChatBody;
