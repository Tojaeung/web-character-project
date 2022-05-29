import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineUser, AiOutlineKey, AiOutlineClose } from 'react-icons/ai';
import { MdPlaylistAdd } from 'react-icons/md';
import Profile from './Profile';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { selectUserUser } from 'store/slices/user.slice';
import { selectChatMessageNotis } from 'store/slices/chat.slice';
import { selectNotificationNotifications } from 'store/slices/notification.slice';
import { openModal } from 'store/slices/modal.slice';
import logo from 'assets/images/logo.jpg';
import { greenButtonStyle } from 'styles/button.style';

function Header() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserUser);
  const messageNotiss = useAppSelector(selectChatMessageNotis);
  const notifications = useAppSelector(selectNotificationNotifications);

  const openLoginModal = async (e: any) => {
    await dispatch(openModal({ modal: 'login' }));
  };

  const [openMobileNav, setOpenMobileNav] = useState(false);

  return (
    <>
      <Container>
        <Logo
          src={logo}
          alt="logo"
          onClick={(e) => {
            navigate('/');
          }}
        />
        <RightSide>
          <NavLink to={'/free'}>자유게시판</NavLink>
          <NavLink to={'/commission'}>커미션</NavLink>
          <NavLink to={'/reque'}>리퀘스트</NavLink>
          <NavLink to={'/sale'}>분양</NavLink>
          {user ? (
            <ProfileBox>
              {(messageNotiss.length || notifications.some((notification) => !notification.is_confirmed)) && (
                <NotificationDot />
              )}
              <Profile />
            </ProfileBox>
          ) : (
            <AuthBox>
              <LoginButton onClick={openLoginModal}>
                <UserIcon />
                로그인
              </LoginButton>
              <SignUpButton onClick={(e) => navigate('/signUp')}>
                <AddIcon />
                회원가입
              </SignUpButton>
            </AuthBox>
          )}
        </RightSide>
      </Container>

      <Responsive>
        {openMobileNav ? (
          <CloseIcon onClick={(e) => setOpenMobileNav(!openMobileNav)} />
        ) : (
          <MenuIcon onClick={(e) => setOpenMobileNav(!openMobileNav)} />
        )}

        {openMobileNav && (
          <NavBox>
            <List>
              <NavLink to={'/free'} onClick={(e) => setOpenMobileNav(false)}>
                자유게시판
              </NavLink>
            </List>
            <List>
              <NavLink to={'/commission'} onClick={(e) => setOpenMobileNav(false)}>
                커미션
              </NavLink>
            </List>
            <List>
              <NavLink to={'/reque'} onClick={(e) => setOpenMobileNav(false)}>
                리퀘스트
              </NavLink>
            </List>
            <List>
              <NavLink to={'/sale'} onClick={(e) => setOpenMobileNav(false)}>
                분양
              </NavLink>
            </List>
          </NavBox>
        )}

        <Logo
          src={logo}
          alt="logo"
          onClick={(e) => {
            navigate('/');
          }}
        />
        {user ? (
          <ProfileBox>
            {(messageNotiss.length || notifications.some((notification) => !notification.is_confirmed)) && (
              <NotificationDot />
            )}
            <Profile />
          </ProfileBox>
        ) : (
          <AuthBox>
            <KeyIcon onClick={openLoginModal} />
          </AuthBox>
        )}
      </Responsive>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  background: ${({ theme }) => theme.palette.bgColor};
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
  margin-bottom: 1rem;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;
const Logo = styled.img`
  cursor: pointer;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
`;

const NavLink = styled(Link)`
  font-size: 1.7rem;
  &:hover {
    text-decoration: underline;
  }
`;

const ProfileBox = styled.div`
  position: relative;
`;
const NotificationDot = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.palette.red};
  border-radius: 70%;
  width: 1rem;
  height: 1rem;
  top: 3rem;
  right: 0.2rem;
  z-index: 1020;
`;

const AuthBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const LoginButton = styled.button`
  display: flex;
  align-items: center;
  ${greenButtonStyle};
  font-size: 1.2rem;
  padding: 0.5rem;
`;
const SignUpButton = styled.button`
  display: flex;
  align-items: center;
  ${greenButtonStyle};
  font-size: 1.2rem;
  padding: 0.5rem;
`;
const UserIcon = styled(AiOutlineUser)`
  font-size: 2rem;
`;
const AddIcon = styled(MdPlaylistAdd)`
  font-size: 2rem;
`;

const Responsive = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
    min-height: 5rem;
    background: ${({ theme }) => theme.palette.bgColor};
  }
`;

const MenuIcon = styled(AiOutlineMenu)`
  font-size: 2.5rem;
  cursor: pointer;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 2.5rem;
  cursor: pointer;
`;

const KeyIcon = styled(AiOutlineKey)`
  font-size: 2.5rem;
  cursor: pointer;
`;

const NavBox = styled.ul`
  position: absolute;
  width: 100%;
  top: 5rem;
  left: 0;
  background-color: ${({ theme }) => theme.palette.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1020;
`;

const List = styled.li`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.palette.gray};
  text-align: center;
  padding: 2rem 0;
`;

export default Header;
