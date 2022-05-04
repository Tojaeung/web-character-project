import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { ImExit } from 'react-icons/im';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectChatIsChatUser, selectChatUser, closeChatModal } from '@src/store/slices/chat.slice';
import { openModal } from '@src/store/slices/modal.slice';
import Avatar from '@src/components/Avatar';
import ChatBody from '@src/components/modals/chat/chatting/ChatBody';
import ChatForm from '@src/components/modals/chat/chatting/ChatForm';

function Chatting() {
  const dispatch = useAppDispatch();
  const isChatUser = useAppSelector(selectChatIsChatUser);

  // 대화창에서 대화목록으로 뒤로가기 됩니다.
  const backToChatList = async (e: React.MouseEvent<SVGElement>) => {
    dispatch(selectChatUser({ selectedChatUser: null }));
  };

  const exitChat = async (e: React.MouseEvent<SVGElement>) => {
    if (!isChatUser) return alert('나가고 싶은 채팅방을 선택해주세요.');
    await dispatch(openModal({ modal: 'exitChat' }));
  };

  const closeChat = async (e: React.MouseEvent<SVGElement>) => {
    await dispatch(closeChatModal());
  };

  return (
    <Container>
      <Header>
        <FlexBox>
          <BackIcon onClick={backToChatList} />
          <Avatar src={isChatUser?.avatar} diameter={3.5} />
          <Nickname>{isChatUser?.nickname}</Nickname>
        </FlexBox>
        <FlexBox>
          <ExitChatIcon onClick={exitChat} />
          <CloseIcon onClick={closeChat} />
        </FlexBox>
      </Header>
      <ChatBody />
      <ChatForm />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 70rem;
  justify-content: space-between;
  @media ${({ theme }) => theme.device.mobile} {
    min-height: 50rem;
  }
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
  font-size: 1.5rem;
  font-weight: bold;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.3rem;
  }
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
