import React from 'react';
import { v4 } from 'uuid';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import 'moment/locale/ko';
import Avatar from 'components/Avatar';
import relativeTime from 'utils/date.util';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { ChatType } from 'interfaces/index';
import {
  selectChatChats,
  selectChat,
  selectChatMessageNotis,
  closeChatModal,
  selectChatMessages,
} from 'store/slices/chat.slice';

function ChatList() {
  const dispatch = useAppDispatch();

  const chats = useAppSelector(selectChatChats);
  const messages = useAppSelector(selectChatMessages);
  const messageNotis = useAppSelector(selectChatMessageNotis);

  const handleSelectChat = (chat: ChatType) => async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(selectChat({ chat }));
  };

  const closeChat = async (e: React.MouseEvent<SVGElement>) => {
    await dispatch(closeChatModal());
  };

  return (
    <Container>
      <Header>
        <Topic>대화상대</Topic>
        <CloseIcon onClick={closeChat} />
      </Header>
      <ChatListBox>
        {!chats.length ? (
          <GuideText>대화상대가 존재하지 않습니다...</GuideText>
        ) : (
          chats.map((chat) => {
            const lastMessage = messages.filter((message) => message.from || message.to === chat.chatId).pop();
            const MessageNotiNum = messageNotis.filter((MessageNoti) => MessageNoti.from === chat.chatId).length;

            return (
              <ListBox key={v4()} onClick={handleSelectChat(chat)}>
                {MessageNotiNum === 0 ? null : (
                  <NotiBox>
                    <NotiNum>{MessageNotiNum}</NotiNum>
                  </NotiBox>
                )}
                <ChatUser>
                  <Avatar src={chat.avatar} diameter={4} />

                  <FlexBox>
                    <Nickname>{chat.nickname}</Nickname>
                    {lastMessage && (
                      <LastMessage>{lastMessage?.type === 'image' ? '이미지' : lastMessage?.content}</LastMessage>
                    )}
                  </FlexBox>
                </ChatUser>
                {lastMessage && <LastDate>{relativeTime(lastMessage?.date!)}</LastDate>}
              </ListBox>
            );
          })
        )}
      </ChatListBox>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
  padding: 1rem;
  background-color: ${({ theme }) => theme.palette.bgColor};
`;
const Topic = styled.span`
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

const ChatListBox = styled.ul``;
const ListBox = styled.li`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  text-overflow: ellipsis;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray};
  }
`;

const GuideText = styled.p`
  text-align: center;
  margin-top: 5rem;
  font-size: 1.4rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;
const ChatUser = styled.div`
  display: flex;
  gap: 1rem;
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 12rem;
`;
const Nickname = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.3rem;
  }
`;
const LastMessage = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.2rem;
`;
const LastDate = styled.span`
  font-size: 1.2rem;
  white-space: nowrap;
`;

const NotiBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: red;
  border-radius: 100%;
  position: absolute;
  top: 3.8rem;
  left: 3.8rem;
`;

const NotiNum = styled.span`
  font-size: 1.2rem;
  color: white;
`;

export default ChatList;
