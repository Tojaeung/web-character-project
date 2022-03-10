import { Container } from './ChatList.styled';
import { v4 } from 'uuid';
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

export default ChatList;
