import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './modals/Login.modal';
import { Container } from '@src/styles/Header.styled';

function Header() {
  const navigate = useNavigate();
  const [openMoal, setOpenModal] = useState<boolean>(false);

  return (
    <Container>
      <div className="logo">기업로고</div>
      <div className="right">
        <button className="right__login-btn" onClick={() => setOpenModal(true)}>
          로그인
        </button>
        <button className="right__register-btn" onClick={() => navigate('/register')}>
          회원가입
        </button>
      </div>
      <LoginModal openModal={openMoal} closeModal={() => setOpenModal(false)} />
    </Container>
  );
}

export default Header;
