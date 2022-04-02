import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { selectChatUser, selectChatOk } from '@src/store/slices/chat.slice';
import { useAppSelector } from '@src/store/app/hook';
import Chatting from '@src/modals/chat/chatting';
import ChatList from '@src/modals/chat/chatList';

function ChatModal() {
  const chatOk = useAppSelector(selectChatOk);
  const chatUser = useAppSelector(selectChatUser);

  if (!chatOk) return null;
  return createPortal(
    <Container>{chatUser ? <Chatting /> : <ChatList />}</Container>,
    document.getElementById('chatPortal') as HTMLElement
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 1rem;
  width: 32rem;
  height: 70rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  background-color: ${({ theme }) => theme.palette.bgColor};
  z-index: 999;
  @media ${({ theme }) => theme.device.mobile} {
    bottom: 5rem;
    right: 0;
    height: 50rem;
  }
`;

export default ChatModal;
