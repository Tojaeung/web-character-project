import { v4 } from 'uuid';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectChats, isChatUser, selectMsgNotis } from '@src/redux/slices/chat.slice';
import { ChatUserType } from '@src/redux/types/chat.type';

function ChatList() {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectChats);
  const msgNotis = useAppSelector(selectMsgNotis);

  const onAddChatUser = (chat: ChatUserType) => async (e: React.MouseEvent<HTMLDivElement>) => {
    await dispatch(isChatUser({ chatUser: chat }));
    localStorage.setItem('chatUser', JSON.stringify(chat));
  };

  return (
    <Container>
      {chats.length > 0 &&
        chats.map((chat) => {
          const msgNotiNum = msgNotis.filter((msgNoti) => msgNoti.from === chat.userId).length;

          return (
            <div className="wrapper" key={v4()} onClick={onAddChatUser(chat)}>
              {msgNotiNum === 0 ? null : (
                <div className="noti-wrapper">
                  <span className="noti-number">{msgNotiNum}</span>
                </div>
              )}
              <div className="avatar-wrapper">
                <img className="avatar-img" src={`${chat.avatar}`} alt="프사" />
              </div>

              <div className="nickname">{chat.nickname}</div>
            </div>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .wrapper {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 1rem;
    cursor: pointer;
    border-radius: 5px;
    text-overflow: ellipsis;
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray};
    }
  }

  .noti-wrapper {
    background-color: red;
    border-radius: 100%;
    position: absolute;
    padding: 0.3rem;
    top: 2.7rem;
    left: 3.2rem;
  }

  .noti-number {
    color: white;
  }

  .avatar-wrapper {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.palette.black};
    overflow: hidden;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .nickname {
    font-size: 1.7rem;
  }
`;
export default ChatList;
