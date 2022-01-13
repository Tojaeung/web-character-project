import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { Container } from '@src/styles/LoginModal.styled';
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

  const onClickFindPw = (e: React.MouseEvent<HTMLSpanElement>) => {
    navigate('/findPw');
    onCloseModal(e);
    setEmail('');
    setPw('');
  };

  const onClickRegister = (e: React.MouseEvent<HTMLSpanElement>) => {
    navigate('/findPw');
    onCloseModal(e);
    setEmail('');
    setPw('');
  };

  if (!openModal) return null;
  return createPortal(
    <Container>
      <div className="background" onClick={onCloseModal} />
      <form className="form" onSubmit={onSubmit}>
        <AiOutlineClose className="form__close-btn" onClick={onCloseModal} />
        <div className="form__title">기업로고</div>
        <div className="form__input-wrapper">
          <div className="form__input">
            <input
              className="form__input-entry"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
            <AiOutlineUser className="form__input-icon" />
          </div>
          <div className="form__input">
            <input
              className="form__input-entry"
              type={hidePw ? 'password' : 'text'}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호"
            />
            {hidePw ? (
              <AiOutlineEye className="form__input-icon" onClick={() => setHidePw(false)} />
            ) : (
              <AiOutlineEyeInvisible className="form__input-icon" onClick={() => setHidePw(true)} />
            )}
          </div>
        </div>
        <div className="form__btn-wrapper">
          <button className="form__submit-btn">로그인</button>
          <div className="form__rest-btn-wrapper">
            <span className="form__findPassword-btn" onClick={onClickFindPw}>
              비밀번호찾기
            </span>
            <span className="form__boundary"> | </span>
            <span className="form__register-btn" onClick={onClickRegister}>
              회원가입
            </span>
          </div>
        </div>
      </form>
    </Container>,
    document.getElementById('portal') as HTMLElement
  );
}

export default LoginModal;
