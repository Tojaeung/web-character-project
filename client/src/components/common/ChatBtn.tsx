import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectChats, openChatModal } from '@src/store/slices/chat.slice';
// import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import socket from '@src/utils/socket';

interface IProps {
  id: number;
  userId: string;
}

function ChatBtn({ id, userId }: IProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const chats = useAppSelector(selectChats);

  const [isChatting, setIsChatting] = useState(false);

  useEffect(() => {
    if (chats.some((chat) => chat.userId === userId)) {
      setIsChatting(true);
    } else {
      setIsChatting(false);
    }
  }, [chats, userId]);

  // 채팅목록에 상대를 추가합니다.
  const onAddChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit('addChat', userId);
    await dispatch(openChatModal());
    localStorage.setItem('chat', 'on');
  };

  return (
    <>
      {id === user?.id ? null : (
        <Container>
          {!isChatting ? (
            <button className="startChat-btn" onClick={onAddChat}>
              채팅하기
            </button>
          ) : (
            <button className="chatting-btn">채팅중...</button>
          )}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  .startChat-btn {
    padding: 1rem;
  }
  .chatting-btn {
    padding: 1rem;
  }
`;

export default ChatBtn;
