import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { selectChatIsChatUser, selectChatOk } from '@src/store/slices/chat.slice';
import { useAppSelector } from '@src/store/app/hook';
import Chatting from '@src/components/modals/chat/chatting';
import ChatList from '@src/components/modals/chat/ChatList';

function Chat() {
  const chatOk = useAppSelector(selectChatOk);
  const isChatUser = useAppSelector(selectChatIsChatUser);

  if (!chatOk) return null;
  return createPortal(
    <Container>{isChatUser ? <Chatting /> : <ChatList />}</Container>,
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
  z-index: 1020;
  @media ${({ theme }) => theme.device.mobile} {
    right: 0;
    width: 100%;
    height: 50rem;
  }
`;

export default Chat;
