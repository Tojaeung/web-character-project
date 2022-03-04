import React from 'react';
import { Container } from './Info.styled';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfileProfile);
  const user = useAppSelector(selectAuthUser);
  const chats = useAppSelector(selectChats);

  // 자기소개를 클릭하면 자기소개 모달창이 나타난다.
  const onShowDesc = async (e: React.MouseEvent<HTMLDivElement>) => {
    await dispatch(openModal({ mode: 'showDesc' }));
  };

  const onFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 새로고침으로 전체를 다시 렌더링 X => 팔로우 숫자 등 리덕스 변수를 임의로 변경해준다.
    await dispatch(follow({ profileId: profile!.id }));
  };

  const onUnFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 새로고침으로 전체를 다시 렌더링 X => 팔로우 숫자 등 리덕스 변수를 임의로 변경해준다.
    await dispatch(unFollow({ profileId: profile!.id }));
  };

  // 채팅목록에 상대를 추가합니다.
  const onAddChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit('addChat', profile?.id);
    await dispatch(openChatModal());
    localStorage.setItem('chat', 'on');
  };

  // const onAddPhoto = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   await dispatch(openModal({ mode: 'addPhoto' }));
  // };

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
          {profile?.id !== user?.id && chats.filter((chat) => chat.id === profile?.id).length === 0 && (
            <div className="chatBtn-wrapper">
              <button className="startChat-btn" onClick={onAddChat}>
                채팅하기
              </button>
            </div>
          )}

          {profile?.id !== user?.id && chats.filter((chat) => chat.id === profile?.id).length !== 0 && (
            <div className="chatBtn-wrapper">
              <button className="startChat-btn" onClick={onAddChat}>
                채팅하기
              </button>
            </div>
          )}

          {profile?.id !== user?.id && profile?.isFollowing === false && (
            <div className="followBtn-wrapper">
              <button className="follow-btn" onClick={onFollow}>
                팔로우
              </button>
            </div>
          )}

          {profile?.id !== user?.id && profile?.isFollowing === true && (
            <div className="followBtn-wrapper">
              <button className="unFollow-btn" onClick={onUnFollow}>
                언팔로우
              </button>
            </div>
          )}

          {user?.id === profile?.id && (
            <div className="addPhotoBtn-wrapper">
              <button className="addPhoto-btn" onClick={() => navigate('/photo/create')}>
                그림+
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Info;
