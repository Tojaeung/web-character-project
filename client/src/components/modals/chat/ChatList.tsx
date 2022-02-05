import { Container } from './ChatList.styled';
import { v4 } from 'uuid';
import { useAppSelector } from '@src/redux/app/hook';
import { selectChatList } from '@src/redux/slices/chat.slice';
import { selectMsgNotis } from '@src/redux/slices/msgNoti.slice';

interface IProp {
  setChatNickname: (e: any) => void;
}

function ChatList({ setChatNickname }: IProp) {
  const chatList = useAppSelector(selectChatList);
  const msgNotis = useAppSelector(selectMsgNotis);

  return (
    <Container>
      {chatList.length > 0 &&
        chatList.map((chat) => {
          const msgNotiNum = msgNotis.filter((msgNoti) => msgNoti.from === chat.nickname).length;

          return (
            <div
              className="wrapper"
              key={v4()}
              onClick={(e) => {
                setChatNickname(chat.nickname);
                localStorage.setItem('chatNickname', chat.nickname);
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
