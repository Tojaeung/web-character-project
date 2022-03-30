import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styled from 'styled-components';
// import { greenButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';
import { loginUser } from '@src/store/requests/auth.request';
import { useAppDispatch } from '@src/store/app/hook';
import { openModal, closeModal } from '@src/store/slices/modal.slice';
import logo from '@src/assets/images/logo.jpg';

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
        <div className="logo">
          <img src={logo} alt="펜슬힐러" />
        </div>

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

const Container = styled.div`
  .form {
    width: 300px;
    height: 350px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.palette.white};
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 10px;
    gap: 1rem;
  }

  .closeBtn {
    font-size: 2.5rem;
    align-self: flex-end;
    cursor: pointer;
  }
  .logo {
    width: 15rem;
    height: 7rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .input-wrapper {
    width: 100%;
    position: relative;
  }

  .input {
  }
  .icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
  }
  .submitBtn {
    width: 100%;

    padding: 1rem;
    font-size: 1.5rem;
  }
  .btn-wrapper {
    text-align: center;
  }
  .findPassword-btn {
    font-size: 1.3rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .boundary {
    font-size: 1.3rem;
  }
  .register-btn {
    font-size: 1.3rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default LoginModal;
