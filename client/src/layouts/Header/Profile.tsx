import React, { useState, useRef, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { BsBell } from 'react-icons/bs';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { selectUserUser } from 'store/slices/user.slice';
import { selectNotificationNotifications } from 'store/slices/notification.slice';
import { signOut } from 'store/requests/session.request';
import Avatar from 'components/Avatar';
import useDropDown from 'hooks/useDropDown';
import Chat from './Chat';

function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUserUser);
  const notifications = useAppSelector(selectNotificationNotifications);
  const [totalNotificationNum, setTotalNotificationNum] = useState(0);

  useEffect(() => {
    const filteredNotification = notifications?.filter((notification) => notification.is_confirmed === false).length;
    setTotalNotificationNum(filteredNotification);
  }, [notifications]);

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
        <Avatar src={user?.avatar} diameter={4} />
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

          <List onClick={(e) => navigate('/settings/notification')}>
            {notifications?.some((notification) => notification.is_confirmed === false) && (
              <NotiBox>
                <NotiNum>{totalNotificationNum}</NotiNum>
              </NotiBox>
            )}
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
  cursor: pointer;
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
  position: relative;
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

const NotiBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: red;
  border-radius: 100%;
  position: absolute;
  top: 2.5rem;
  left: 2.5rem;
`;

const NotiNum = styled.span`
  font-size: 1.2rem;
  color: white;
`;
export default Profile;
