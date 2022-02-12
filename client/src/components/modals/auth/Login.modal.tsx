import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Container } from './Login.modal.styled';
import { loginUser } from '@src/redux/requests/auth.request';
import { useAppDispatch } from '@src/redux/app/hook';
import { openModal, closeModal } from '@src/redux/slices/modal.slice';

function LoginModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [hidePw, setHidePw] = useState(true);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const onCloseModal = async (e: any) => {
    await dispatch(closeModal());
    setEmail('');
    setPw('');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, pw };
    const response = await dispatch(loginUser(data)).unwrap();
    const { ok, message } = response;
    if (!ok) return alert(message);
    await dispatch(closeModal());
    navigate(0);
    localStorage.setItem('login', 'on');
  };

  const onClickFindPw = async (e: React.MouseEvent<HTMLSpanElement>) => {
    await dispatch(closeModal());
    await dispatch(openModal({ mode: 'findPw' }));
    setEmail('');
    setPw('');
  };

  const onClickRegister = async (e: React.MouseEvent<HTMLSpanElement>) => {
    await dispatch(closeModal());
    setEmail('');
    setPw('');
    navigate('/auth/register');
  };

  // if (!openModal) return null;
  return (
    <Container>
      <form className="form" onSubmit={onSubmit}>
        <AiOutlineClose className="closeBtn" onClick={onCloseModal} />
        <div className="title">기업로고</div>

        <div className="input-wrapper">
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
          <AiOutlineUser className="icon" />
        </div>
        <div className="input-wrapper">
          <input
            className="input"
            type={hidePw ? 'password' : 'text'}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호"
          />
          {hidePw ? (
            <AiOutlineEye className="icon" onClick={() => setHidePw(false)} />
          ) : (
            <AiOutlineEyeInvisible className="icon" onClick={() => setHidePw(true)} />
          )}
        </div>

        <button className="submitBtn">로그인</button>
        <div className="btn-wrapper">
          <span className="findPassword-btn" onClick={onClickFindPw}>
            비밀번호찾기
          </span>
          <span className="boundary"> | </span>
          <span className="register-btn" onClick={onClickRegister}>
            회원가입
          </span>
        </div>
      </form>
    </Container>
  );
}

export default LoginModal;
