import React from 'react';
import { Container } from './Info.styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import socket from '@src/utils/socket';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectProfileUser } from '@src/redux/slices/profile.slice';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { selectChats } from '@src/redux/slices/chat.slice';
import { openChatModal } from '@src/redux/slices/chat.slice';

function Info() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfileUser);
  const user = useAppSelector(selectAuthUser);
  const chats = useAppSelector(selectChats);

  const onAddChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit('addChat', profile?.id);
    await dispatch(openChatModal());
    localStorage.setItem('chat', 'on');
  };

  const onFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.post('/api/profile/follow', { profileId: profile?.id }, { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    navigate(0);
  };

  const onUnFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.post('/api/profile/unFollow', { profileId: profile?.id }, { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    navigate(0);
  };

  return (
    <Container>
      <div className="avatar-wrapper">
        <img className="avatar-img" src={profile?.avatar} alt="프사" />
      </div>
      <div className="info-wrapper">
        <div className="row1">
          <span className="level">[Lv.{profile?.level}]</span>
          <div className="nickname">{profile?.nickname}</div>
          <div className="btn-wrapper">
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
              {profile?.id !== user?.id && profile?.followers.filter((userId) => userId === user?.id).length === 0 && (
                <button className="follow-btn" onClick={onFollow}>
                  팔로우
                </button>
              )}
              {profile?.id !== user?.id && profile?.followers.filter((userId) => userId === user?.id).length !== 0 && (
                <button className="unFollow-btn" onClick={onUnFollow}>
                  언팔로우
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="follow-wrapper">
          <div className="follower">
            <span>팔로워</span> {profile?.followers.length}
          </div>
          <div className="following">
            <span>팔로잉</span> {profile?.followings.length}
          </div>
        </div>
        <hr />
        <div className="desc-wrapper">
          <div className="desc-title">
            자기소개
            {profile?.id === user?.id && (
              <FiSettings className="desc-icon" onClick={(e) => navigate('/settings/description')} />
            )}
          </div>

          <div className="desc" dangerouslySetInnerHTML={{ __html: profile?.description as string }}></div>
        </div>
      </div>
    </Container>
  );
}

export default Info;
