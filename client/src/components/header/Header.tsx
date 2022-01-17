import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginModal from '../modals/Login.modal';
import Profile from './Profile';
import Alert from './Alert';
import Chat from './Chat';
import Search from './Search';
import Menu from './Menu';
import { Container } from '@src/components/header/Header.styled';
import { useAppSelector } from '@src/redux/app/hook';
import { selectAuthToken } from '@src/redux/slices/auth.slice';

function Header() {
  const navigate = useNavigate();
  const token = useAppSelector(selectAuthToken);

  const [openMoal, setOpenModal] = useState<boolean>(false);

  return (
    <Container>
      <div className="logo">기업로고</div>
      <Menu />
      <Search />
      <div className="right">
        {token ? (
          <div className="right__tools">
            <Chat />
            <Alert />
            <Profile />
          </div>
        ) : (
          <div className="right__tools">
            <button className="right__login-btn" onClick={() => setOpenModal(true)}>
              로그인
            </button>
            <button className="right__register-btn" onClick={() => navigate('/register')}>
              회원가입
            </button>
          </div>
        )}
      </div>
      <LoginModal openModal={openMoal} closeModal={() => setOpenModal(false)} />
    </Container>
  );
}

export default Header;
