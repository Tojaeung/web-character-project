import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
import { useAppSelector } from '@src/redux/app/hook';
import { selectChatUser, selectMessages } from '@src/redux/slices/chat.slice';

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
          .filter((message) => message.to === chatUser.userId || message.from === chatUser.userId)
          .map((message) => {
            return (
              <div className={message.to === chatUser.userId ? 'sent-wrapper' : 'received-wrapper'} key={v4()}>
                <div className={message.to === chatUser.userId ? 'sent-body' : 'received-body'}>
                  {message.type === 'text' ? (
                    <div className="textMessage">{message.content}</div>
                  ) : (
                    <img className="imgMessage" src={message.content} alt="이미지" />
                  )}
                </div>
                <div>{moment(message.date).fromNow()}</div>
              </div>
            );
          })}
      <div ref={messageBoxRef} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  overflow-y: scroll;

  .sent-wrapper {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    background-color: ${({ theme }) => theme.palette.white};

    margin-bottom: 0.2rem;
  }

  .received-wrapper {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.palette.white};

    margin-bottom: 0.2rem;
  }

  .sent-body {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    background-color: ${({ theme }) => theme.palette.green};
    border-radius: 10px;
  }
  .received-body {
    padding: 1rem;
    display: flex;
    background-color: ${({ theme }) => theme.palette.red};
    border-radius: 10px;
    justify-content: flex-start;
  }
  .textMessage {
    font-size: 1.2rem;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .imgMessage {
    /* width: 50%; */
  }
`;

export default ChatBody;
