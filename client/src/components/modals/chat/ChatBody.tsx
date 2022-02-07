import React, { useEffect, useRef } from 'react';
import * as S from './ChatBody.styled';
import { v4 } from 'uuid';
import { useAppSelector } from '@src/redux/app/hook';
import { selectMessages } from '@src/redux/slices/message.slice';

interface ChatType {
  id: string;
  nickname: string;
  avatar: string;
}
interface IProp {
  chat: ChatType | null | undefined;
}

function ChatBody({ chat }: IProp) {
  const messages = useAppSelector(selectMessages);

  // 새로운 메세지 추가, 대화상대 바뀔때마다 스크롤 하단으로 내리기
  const messageBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chat]);

  return (
    <S.Container>
      {chat &&
        messages.length > 0 &&
        messages
          .filter((message) => message.to === chat.id || message.from === chat.id)
          .map((message) => {
            const date = message.date;
            const parsedDate = date.split('-');
            return (
              <S.Message kinds={`${message.to === chat.id ? 'sent' : 'received'}`} key={v4()}>
                <S.Header kinds={`${message.to === chat.id ? 'sent' : 'received'}`}>
                  {message.to === chat.id ? (
                    <>
                      <div className="time">{`${parsedDate[0]}-${parsedDate[1]}-${parsedDate[2]}(${parsedDate[3]}) ${parsedDate[4]}`}</div>
                    </>
                  ) : (
                    <>
                      <div className="time">{`${parsedDate[0]}-${parsedDate[1]}-${parsedDate[2]}(${parsedDate[3]}) ${parsedDate[4]}`}</div>
                    </>
                  )}
                </S.Header>

                <S.Body kinds={`${message.to === chat.id ? 'sent' : 'received'}`}>
                  {message.type === 'text' ? <div>{message.content}</div> : <img src={message.content} alt="이미지" />}
                </S.Body>
              </S.Message>
            );
          })}
      <div ref={messageBoxRef} />
    </S.Container>
  );
}

export default ChatBody;
