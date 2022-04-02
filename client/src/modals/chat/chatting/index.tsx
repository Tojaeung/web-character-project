import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { ImExit } from 'react-icons/im';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { isChatUser, selectChatUser, closeChatModal } from '@src/store/slices/chat.slice';
import { openModal } from '@src/store/slices/modal.slice';
import Avatar from '@src/components/Avatar';
import ChatBody from '@src/modals/chat/chatting/ChatBody';
import ChatFooter from '@src/modals/chat/chatting/ChatFooter';

function Chatting() {
  const dispatch = useAppDispatch();
  const chatUser = useAppSelector(selectChatUser);

  useEffect(() => {
    const chatObj = JSON.parse(localStorage.getItem('chatUser') as string);
    if (!chatObj) return;
    dispatch(isChatUser({ chatUser: chatObj }));
  }, []);

  // 대화창에서 대화목록으로 뒤로가기 됩니다.
  const backToChatList = async (e: React.MouseEvent<SVGElement>) => {
    dispatch(isChatUser({ chatUser: null }));
    localStorage.removeItem('chatUser');
  };

  const exitChat = async (e: React.MouseEvent<SVGElement>) => {
    if (!chatUser) return alert('나가고 싶은 채팅방을 선택해주세요.');
    await dispatch(openModal({ mode: 'exitChat' }));
  };

  const closeChat = async (e: React.MouseEvent<SVGElement>) => {
    localStorage.removeItem('chat');
    await dispatch(closeChatModal());
  };

  return (
    <Container>
      <Header>
        <FlexBox>
          <BackIcon onClick={backToChatList} />
          <Avatar src={chatUser?.avatar} size="small" />
          <Nickname>{chatUser?.nickname}</Nickname>
        </FlexBox>
        <FlexBox>
          <ExitChatIcon onClick={exitChat} />
          <CloseIcon onClick={closeChat} />
        </FlexBox>
      </Header>
      <ChatBody />
      <ChatFooter />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 70rem;
  justify-content: space-between;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
  padding: 0.5rem;
`;
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const Nickname = styled.span`
  font-weight: bold;
`;
const CloseIcon = styled(AiOutlineClose)`
  font-size: 2rem;
  cursor: pointer;
`;
const BackIcon = styled(IoIosArrowBack)`
  font-size: 2rem;
  cursor: pointer;
`;
const ExitChatIcon = styled(ImExit)`
  font-size: 2rem;
  cursor: pointer;
`;

export default Chatting;
