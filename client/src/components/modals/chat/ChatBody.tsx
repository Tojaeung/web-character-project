import React, { useEffect, useRef } from 'react';
import * as S from './ChatBody.styled';
import { v4 } from 'uuid';
import { useAppSelector } from '@src/redux/app/hook';
import { selectMessageList } from '@src/redux/slices/message.slice';

interface IProp {
  chatNickname: string | null | undefined;
}

function ChatBody({ chatNickname }: IProp) {
  const messageList = useAppSelector(selectMessageList);

  // 새로운 메세지 추가, 대화상대 바뀔때마다 스크롤 하단으로 내리기
  const messageBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList, chatNickname]);

  return (
    <S.Container>
      {chatNickname &&
        messageList.length > 0 &&
        messageList
          .filter((message) => message.to === chatNickname || message.from === chatNickname)
          .map((message) => {
            const date = message.date;
            const parsedDate = date.split('-');
            return (
              <S.Message kinds={`${message.to === chatNickname ? 'sent' : 'received'}`} key={v4()}>
                <S.Header kinds={`${message.to === chatNickname ? 'sent' : 'received'}`}>
                  {message.to === chatNickname ? (
                    <>
                      <div className="time">{`${parsedDate[0]}-${parsedDate[1]}-${parsedDate[2]}(${parsedDate[3]}) ${parsedDate[4]}`}</div>
                      <div className="from">{message.from}</div>
                    </>
                  ) : (
                    <>
                      <div className="from">{message.from}</div>
                      <div className="time">{`${parsedDate[0]}-${parsedDate[1]}-${parsedDate[2]}(${parsedDate[3]}) ${parsedDate[4]}`}</div>
                    </>
                  )}
                </S.Header>

                <S.Body kinds={`${message.to === chatNickname ? 'sent' : 'received'}`}>
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
