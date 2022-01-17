import React, { useState, useEffect, useRef } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';

import { Container } from '@src/components/header/Profile.styled';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { logoutUser } from '@src/redux/requests/auth.request';

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
    const response = await dispatch(logoutUser()).unwrap();
    const { ok } = response;
    if (ok) {
      localStorage.removeItem('login');
    }
  };
  return (
    <Container openProfile={openProfile}>
      <div className="profile" onClick={(e) => setOpenProfile(!openProfile)}>
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar-img" src={user?.avatar} alt="프로필사진" />
        </div>
        <div className="profile__userInfo-wrapper">
          <div className="profile__nickname">{user?.nickname}</div>
          <div className="profile__level">Level: 1</div>
        </div>
        <div className="profile__chevron">{openProfile ? <FaChevronDown /> : <FaChevronUp />}</div>
      </div>
      {openProfile && (
        <ul className="dropDown" ref={ref}>
          <li className="dropDown__userInfo">
            <CgProfile className="dropDown__icon" />
            프로필
          </li>
          <li className="dropDown__dashboard">
            <MdOutlineDashboardCustomize className="dropDown__icon" />
            대쉬보드
          </li>
          <li className="dropDown__logout" onClick={onLogout}>
            <FiLogOut className="dropDown__icon" />
            로그아웃
          </li>
        </ul>
      )}
    </Container>
  );
}

export default Profile;
