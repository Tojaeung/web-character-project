import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './modals/Login.modal';

import { Container } from '@src/styles/Header.styled';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectAuthToken } from '@src/redux/slices/auth.slice';
import { logoutUser } from '@src/redux/requests/auth.request';

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuthToken);

  const [openMoal, setOpenModal] = useState<boolean>(false);

  const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await dispatch(logoutUser()).unwrap();
    if (res.ok) {
      localStorage.removeItem('login');
    }
  };

  return (
    <Container>
      <div className="logo">기업로고</div>
      <div className="right">
        {token ? (
          <button className="right__logout-btn" onClick={onLogout}>
            로그아웃
          </button>
        ) : (
          <>
            <button className="right__login-btn" onClick={() => setOpenModal(true)}>
              로그인
            </button>
            <button className="right__register-btn" onClick={() => navigate('/register')}>
              회원가입
            </button>
          </>
        )}
      </div>
      <LoginModal openModal={openMoal} closeModal={() => setOpenModal(false)} />
    </Container>
  );
}

export default Header;
