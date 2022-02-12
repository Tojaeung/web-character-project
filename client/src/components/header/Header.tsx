import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import Alert from './Alert';
import Chat from './Chat';
import Search from './Search';
import Menu from './Menu';
import { Container } from '@src/components/header/Header.styled';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { openModal } from '@src/redux/slices/modal.slice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const openLoginModal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'login' }));
  };

  return (
    <Container>
      <div className="logo">기업로고</div>
      <Menu />
      <Search />
      <div className="right">
        {user ? (
          <div className="right__tools">
            <Chat />
            <Alert />
            <Profile />
          </div>
        ) : (
          <div className="right__tools">
            <button className="right__login-btn" onClick={openLoginModal}>
              로그인
            </button>
            <button className="right__register-btn" onClick={() => navigate('/auth/register')}>
              회원가입
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Header;
