import React, { useState, useEffect, useRef } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container } from '@src/components/header/Profile.styled';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { logoutUser } from '@src/redux/requests/auth.request';

import socket from '@src/utils/socket';

function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  const [openProfile, setOpenProfile] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (openProfile && ref.current && !ref.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [openProfile]);

  const onLogout = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(logoutUser());
    localStorage.removeItem('chat');
    localStorage.removeItem('chatNickname');
    socket.disconnect();
  };
  return (
    <Container openProfile={openProfile}>
      <div className="profile" onClick={(e) => setOpenProfile(!openProfile)}>
        <div className="avatarWrapper">
          <img className="avatarImg" src={user?.avatar} alt="프로필사진" />
        </div>
        <div className="infoWrapper">
          <div className="nickname">{user?.nickname}</div>
          <div className="level">Level: 1</div>
        </div>
        <div className="ChevronIcon">{openProfile ? <FaChevronDown /> : <FaChevronUp />}</div>
      </div>
      {openProfile && (
        <ul className="dropDown" ref={ref}>
          <li>
            <Link to={`/`} className="list">
              <CgProfile className="listIcon" />
              프로필
            </Link>
          </li>
          <li>
            <Link to={`/settings/account`} className="list">
              <FiSettings className="listIcon" />
              설정
            </Link>
          </li>
          <li className="list" onClick={onLogout}>
            <FiLogOut className="listIcon" />
            로그아웃
          </li>
        </ul>
      )}
    </Container>
  );
}

export default Profile;
