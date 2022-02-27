import React from 'react';
import { Container } from './Info.styled';
import socket from '@src/utils/socket';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectProfileProfile } from '@src/redux/slices/profile.slice';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { selectChats } from '@src/redux/slices/chat.slice';
import { openChatModal } from '@src/redux/slices/chat.slice';
import { follow, unFollow } from '@src/redux/requests/profile.request';
import { openModal } from '@src/redux/slices/modal.slice';

function Info() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfileProfile);
  const user = useAppSelector(selectAuthUser);
  const chats = useAppSelector(selectChats);

  const onAddChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit('addChat', profile?.id);
    await dispatch(openChatModal());
    localStorage.setItem('chat', 'on');
  };

  const onFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 새로고침으로 전체를 다시 렌더링 X => 팔로우 숫자 등 리덕스 변수를 임의로 변경해준다.
    await dispatch(follow({ profileId: profile!.id }));
  };

  const onUnFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 새로고침으로 전체를 다시 렌더링 X => 팔로우 숫자 등 리덕스 변수를 임의로 변경해준다.
    await dispatch(unFollow({ profileId: profile!.id }));
  };

  const onShowDesc = async (e: React.MouseEvent<HTMLDivElement>) => {
    await dispatch(openModal({ mode: 'showDesc' }));
  };

  return (
    <Container>
      <div className="cover-wrapper">
        <img className="cover-img" src={profile?.cover} alt="커버" />
      </div>
      <div className="avatar-wrapper">
        <img className="avatar-img" src={profile?.avatar} alt="프사" />
      </div>
      <div className="info-wrapper">
        <div className="row1">
          <div className="level">[Lv.{profile?.level}]</div>
          <div className="nickname">{profile?.nickname}</div>
        </div>

        <div className="row2">
          <div className="desc" onClick={onShowDesc}>
            자기소개
          </div>
        </div>

        <div className="row3">
          <div className="follower">
            <span>팔로워</span> {profile?.followerNum}
          </div>
          <div className="following">
            <span>팔로잉</span> {profile?.followeeNum}
          </div>
        </div>

        <div className="row4">
          <div className="chatBtn-wrapper">
            {profile?.id !== user?.id && chats.filter((chat) => chat.id === profile?.id).length === 0 && (
              <button className="startChat-btn" onClick={onAddChat}>
                채팅하기
              </button>
            )}
            {profile?.id !== user?.id && chats.filter((chat) => chat.id === profile?.id).length !== 0 && (
              <button className="chatting-btn">채팅중...💬</button>
            )}
          </div>
          <div className="followBtn-wrapper">
            {profile?.id !== user?.id && profile?.isFollowing === false && (
              <button className="follow-btn" onClick={onFollow}>
                팔로우
              </button>
            )}
            {profile?.id !== user?.id && profile?.isFollowing === true && (
              <button className="unFollow-btn" onClick={onUnFollow}>
                언팔로우
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Info;
