import { Container } from './ChatList.styled';
import { v4 } from 'uuid';
import { useAppSelector } from '@src/redux/app/hook';
import { selectChats } from '@src/redux/slices/chat.slice';
import { selectMsgNotis } from '@src/redux/slices/msgNoti.slice';

interface IProp {
  setChat: (e: any) => void;
}

function ChatList({ setChat }: IProp) {
  const chats = useAppSelector(selectChats);
  const msgNotis = useAppSelector(selectMsgNotis);

  return (
    <Container>
      {chats.length > 0 &&
        chats.map((chat) => {
          const msgNotiNum = msgNotis.filter((msgNoti) => msgNoti.from === chat.id).length;

          return (
            <div
              className="wrapper"
              key={v4()}
              onClick={(e) => {
                setChat(chat);
                localStorage.setItem('chatUser', JSON.stringify(chat));
              }}
            >
              {msgNotiNum === 0 ? null : (
                <div className="noti">
                  <span className="noti-number">{msgNotiNum}</span>
                </div>
              )}
              <div className="avatar">
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
