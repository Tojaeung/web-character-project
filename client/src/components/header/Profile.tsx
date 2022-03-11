import React, { useState, useEffect, useRef } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { logoutUser } from '@src/redux/requests/auth.request';

import socket from '@src/utils/socket';

function Profile() {
  const navigate = useNavigate();
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
    localStorage.clear();
    socket.disconnect();
    navigate(0);
  };
  return (
    <Container openProfile={openProfile}>
      <div className="profile" onClick={(e) => setOpenProfile(!openProfile)}>
        <div className="avatar">
          <img src={user?.avatar} alt="프로필사진" />
        </div>
      </div>
      {openProfile && (
        <ul className="dropDown" ref={ref}>
          <div className="user">
            <div className="avatar">
              <img src={user?.avatar} alt="프로필사진" />
            </div>
            <div className="info">
              <span>[Lv.{user?.level}] </span>
              {user?.nickname}
            </div>
          </div>
          <Link to={`/profile/${user?.id}`}>
            <li>
              <CgProfile className="icon" />
              프로필
            </li>
          </Link>

          <Link to={`/settings`}>
            <li>
              <FiSettings className="icon" />
              설정
            </li>
          </Link>
          <li onClick={onLogout}>
            <FiLogOut className="icon" />
            로그아웃
          </li>
        </ul>
      )}
    </Container>
  );
}

const Container = styled.div<{ openProfile: boolean }>`
  position: relative;
  .profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
  }
  .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.palette.black};
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .dropDown {
    position: absolute;
    width: 20rem;
    top: 5rem;
    right: 0.5rem;
    font-size: 1.7rem;
    border-radius: 5px;
    background: ${({ theme }) => theme.palette.bgColor};
    box-shadow: ${({ theme }) => theme.palette.shadowColor};

    .user {
      display: flex;
      gap: 1rem;
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
      .avatar {
        width: 10rem;
        height: 10rem;
      }
      .info {
        margin-bottom: 1rem;
        span {
          font-weight: 500;
        }
        font-weight: 800;
      }
    }

    li {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      &:hover {
        background: ${({ theme }) => theme.palette.gray};
        cursor: pointer;
      }
    }

    .icon {
      font-size: 2.5rem;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    .avatar {
      width: 3.5rem;
      height: 3.5rem;
    }
    .dropDown {
      top: -30rem;
      right: -1rem;
    }
  }
`;

export default Profile;
