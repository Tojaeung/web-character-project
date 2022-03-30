import React, { useState, useRef } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { logoutUser } from '@src/store/requests/auth.request';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import socket from '@src/utils/socket';
import useDropDown from '@src/hook/useDropDown';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);

  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  const onLogout = async (e: React.MouseEvent<HTMLDivElement>) => {
    await dispatch(logoutUser());
    localStorage.clear();
    socket.disconnect();
    navigate(0);
  };
  return (
    <Container>
      <AvatarBox onClick={(e) => setOpenDropDown(!openDropDown)}>
        <Avatar src={user?.avatar} size="small" />
      </AvatarBox>
      {openDropDown && (
        <DropDown ref={targetRef}>
          <UserInfo>
            <Avatar src={user?.avatar} size="large" />
            <Nickname exp={user?.exp!} nickname={user?.nickname!} size="medium" />
          </UserInfo>

          <NavLink to={`/profile/${user?.id}`}>
            <ProfileIcon />
            프로필
          </NavLink>

          <NavLink to="/settings">
            <SettingsIcon />
            설정
          </NavLink>

          <LogOut onClick={onLogout}>
            <LogOutIcon />
            로그아웃
          </LogOut>
        </DropDown>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
const AvatarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const DropDown = styled.ul`
  position: absolute;
  width: 20rem;
  top: 5rem;
  right: 0.5rem;
  font-size: 1.7rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.palette.bgColor};
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  @media ${({ theme }) => theme.device.mobile} {
    top: -30rem;
    right: -1rem;
  }
`;
const UserInfo = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
`;
const NavLink = styled(Link)`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  &:hover {
    background: ${({ theme }) => theme.palette.gray};
    cursor: pointer;
  }
`;
const ProfileIcon = styled(CgProfile)`
  font-size: 2.5rem;
`;

const SettingsIcon = styled(FiSettings)`
  font-size: 2.5rem;
`;
const LogOut = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  &:hover {
    background: ${({ theme }) => theme.palette.gray};
    cursor: pointer;
  }
`;
const LogOutIcon = styled(FiLogOut)`
  font-size: 2.5rem;
`;
export default Profile;
