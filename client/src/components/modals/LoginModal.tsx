import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { Background, Form, Header, Body, Footer } from '@src/styles/LoginModal.styled';
import { IProps } from '@src/types/LoginModal.type';

function LoginModal({ openModal, closeModal }: IProps) {
  const navigate = useNavigate();
  const [hidePw, setHidePw] = useState(true);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const onCloseModal = (e: any) => {
    closeModal(e);
    setEmail('');
    setPw('');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post('/api/login', { email, pw });
    const { status } = res.data;
    if (status === true) {
      console.log(res.data);
      alert('로그인 되었습니다.');
    }
  };

  if (!openModal) return null;
  return createPortal(
    <>
      <Background onClick={onCloseModal} />
      <Form onSubmit={onSubmit}>
        <AiOutlineClose className="modal-close-button" onClick={onCloseModal} />
        <Header>기업로고</Header>
        <Body>
          <div className="input-wrapper">
            <input
              className="login-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
            <AiOutlineUser className="login-email-icon" />
          </div>
          <div className="input-wrapper">
            <input
              className="login-password-input"
              type={hidePw ? 'password' : 'text'}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호"
            />
            {hidePw ? (
              <AiOutlineEye className="login-password-icon" onClick={() => setHidePw(false)} />
            ) : (
              <AiOutlineEyeInvisible className="login-password-icon" onClick={() => setHidePw(true)} />
            )}
          </div>
        </Body>
        <Footer>
          <button className="login-button">로그인</button>
          <div className="modal-rest-wrapper">
            <span className="find-password-button" onClick={() => navigate('/')}>
              비밀번호찾기
            </span>
            <span className="boundary"> | </span>
            <span className="register-button" onClick={() => navigate('/register')}>
              회원가입
            </span>
          </div>
        </Footer>
      </Form>
    </>,
    document.getElementById('portal') as HTMLElement
  );
}

export default LoginModal;
