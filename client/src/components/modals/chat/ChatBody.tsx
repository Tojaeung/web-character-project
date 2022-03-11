import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import styled from 'styled-components';
import { useAppSelector } from '@src/redux/app/hook';
import { selectChatUser, selectMessages } from '@src/redux/slices/chat.slice';
import { selectAuthUser } from '@src/redux/slices/auth.slice';

function ChatBody() {
  const user = useAppSelector(selectAuthUser);
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
            const date = message.date;
            const parsedDate = date.split('-');
            return (
              <div className={message.to === chatUser.userId ? 'sent-wrapper' : 'received-wrapper'} key={v4()}>
                <div className={message.to === chatUser.userId ? 'sent-header' : 'received-header'}>
                  {message.to === chatUser.userId ? (
                    <>
                      <div className="sent-time">{`${parsedDate[0]}-${parsedDate[1]}-${parsedDate[2]}(${parsedDate[3]}) ${parsedDate[4]}`}</div>
                      <div className="sent-from">{user?.nickname}</div>
                    </>
                  ) : (
                    <>
                      <div className="received-from">{chatUser.nickname}</div>
                      <div className="received-time">{`${parsedDate[0]}-${parsedDate[1]}-${parsedDate[2]}(${parsedDate[3]}) ${parsedDate[4]}`}</div>
                    </>
                  )}
                </div>
                <div className={message.to === chatUser.userId ? 'sent-body' : 'received-body'}>
                  {message.type === 'text' ? (
                    <div className="textMessage">{message.content}</div>
                  ) : (
                    <img className="imgMessage" src={message.content} alt="이미지" />
                  )}
                </div>
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
    border: 1px solid ${({ theme }) => theme.palette.gray3};
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .received-wrapper {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.gray3};
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .sent-header {
    width: 100%;
    display: flex;
    padding: 0.3rem;
    align-items: center;
    justify-content: flex-end;
  }

  .received-header {
    width: 100%;
    display: flex;
    padding: 0.3rem;
    align-items: center;
    justify-content: flex-start;
  }
  .sent-time {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.palette.gray5};
  }
  .sent-from {
    font-size: 1.2rem;
    font-weight: 700;
  }
  .received-from {
    margin-right: 0.5rem;
    font-size: 1.2rem;
    font-weight: 700;
  }
  .received-time {
    color: ${({ theme }) => theme.palette.gray5};
  }

  .sent-body {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }
  .received-body {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: flex-start;
  }
  .textMessage {
    font-size: 1.2rem;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .imgMessage {
    width: 50%;
  }
`;

export default ChatBody;
