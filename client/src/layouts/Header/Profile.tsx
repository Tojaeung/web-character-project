import React, { useState, useRef } from 'react';
import { CgProfile } from 'react-icons/cg';
import { BsBell } from 'react-icons/bs';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';
import { signOut } from '@src/store/requests/session.request';
import Avatar from '@src/components/Avatar';
import useDropDown from '@src/hooks/useDropDown';
import Chat from './Chat';

function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUserUser);

  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  const handleLogout = async (e: React.MouseEvent<HTMLLIElement>) => {
    try {
      await dispatch(signOut()).unwrap();
      navigate('/');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const chatRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <AvatarBox onClick={(e) => setOpenDropDown(!openDropDown)}>
        <Avatar src={user?.avatar} size="small" />
      </AvatarBox>
      {openDropDown && (
        <DropDown ref={targetRef} onClick={(e) => setOpenDropDown(!openDropDown)}>
          <GoProfile href={`/profile/${user?.id}`}>
            <ProfileIcon />
            프로필
          </GoProfile>

          <List onClick={(e) => chatRef.current?.click()}>
            <Chat chatRef={chatRef} />
            메세지
          </List>

          <List>
            <BellIcon />
            알림
          </List>

          <NavLink to="/settings/account">
            <SettingsIcon />
            설정
          </NavLink>

          <List onClick={handleLogout}>
            <LogOutIcon />
            로그아웃
          </List>
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
  width: 17rem;
  top: 5rem;
  right: 0.5rem;
  font-size: 1.7rem;
  border-radius: 5px;
  z-index: 1032;
  background: ${({ theme }) => theme.palette.bgColor};
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  @media ${({ theme }) => theme.device.mobile} {
    width: 13rem;
    font-size: 1.5rem;
    top: 4.5rem;
  }
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
const List = styled.li`
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
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
  }
`;
const BellIcon = styled(BsBell)`
  font-size: 2.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
  }
`;

const SettingsIcon = styled(FiSettings)`
  font-size: 2.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
  }
`;

const LogOutIcon = styled(FiLogOut)`
  font-size: 2.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
  }
`;

const GoProfile = styled.a`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  &:hover {
    background: ${({ theme }) => theme.palette.gray};
    cursor: pointer;
  }
`;
export default Profile;
