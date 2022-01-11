import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './modals/Login.modal';
import { Container, Logo, Auth } from '@src/styles/Header.styled';

function Header() {
  const navigate = useNavigate();
  const [openMoal, setOpenModal] = useState<boolean>(false);

  return (
    <Container>
      <Logo>기업로고</Logo>
      <Auth>
        <button className="login-button" onClick={() => setOpenModal(true)}>
          로그인
        </button>
        <button className="register-button" onClick={() => navigate('/register')}>
          회원가입
        </button>
      </Auth>
      <LoginModal openModal={openMoal} closeModal={() => setOpenModal(false)} />
    </Container>
  );
}

export default Header;
