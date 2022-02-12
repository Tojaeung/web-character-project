import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as S from './Chat.modal.styled';
import { AiOutlineClose } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import ChatList from './ChatList';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';
import { isChatUser, selectChats, selectChatUser, selectChatOk, closeChatModal } from '@src/redux/slices/chat.slice';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { openModal } from '@src/redux/slices/modal.slice';

function ChatModal() {
  const dispatch = useAppDispatch();
  const chatOk = useAppSelector(selectChatOk);
  const chatUser = useAppSelector(selectChatUser);
  const chats = useAppSelector(selectChats);

  useEffect(() => {
    const chatObj = JSON.parse(localStorage.getItem('chatUser') as string);
    if (!chatObj) return;
    dispatch(isChatUser({ chatUser: chatObj }));
  }, []);

  const onExitChat = async (e: React.MouseEvent<SVGElement>) => {
    if (!chatUser) return alert('나가고 싶은 채팅방을 선택해주세요.');
    await dispatch(openModal({ mode: 'exitChat' }));
  };

  const onClose = async (e: React.MouseEvent<SVGElement>) => {
    localStorage.removeItem('chat');
    await dispatch(closeChatModal());
  };

  if (!chatOk) return null;
  return createPortal(
    <S.Container>
      <S.ListWrapper>
        <ChatList />
      </S.ListWrapper>

      <S.WindowWrapper>
        <S.Header>
          <span>
            {chats.length === 0 && !chatUser && '채팅상대를 추가해주세요!! 🔍'}
            {chats.length > 0 && !chatUser && '왼쪽 채팅상대를 클릭하세요!! 📢'}
            {chats.length > 0 && chatUser && `${chatUser.nickname}님과 채팅 중...💬`}
          </span>
          <div>
            <ImExit className="exitChat-icon" onClick={onExitChat} />
            <AiOutlineClose className="closeIcon" onClick={onClose} />
          </div>
        </S.Header>

        <S.Body>
          <ChatBody />
        </S.Body>

        <S.Footer>
          <ChatFooter />
        </S.Footer>
      </S.WindowWrapper>
    </S.Container>,
    document.getElementById('portal') as HTMLElement
  );
}

export default ChatModal;
