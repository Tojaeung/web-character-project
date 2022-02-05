import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Container } from '@src/components/modals/Login.modal.styled';
import { loginUser } from '@src/redux/requests/auth.request';
import { useAppDispatch } from '@src/redux/app/hook';

interface IProps {
  openModal: boolean;
  closeModal: (e: any) => void;
}

function LoginModal({ openModal, closeModal }: IProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    const data = { email, pw };
    const response = await dispatch(loginUser(data)).unwrap();
    const { ok, message } = response;
    if (!ok) {
      alert(message);
      return;
    }
    onCloseModal(e);
    navigate(0);
  };

  const onClickFindPw = (e: React.MouseEvent<HTMLSpanElement>) => {
    navigate('/auth/findPw');
    onCloseModal(e);
    setEmail('');
    setPw('');
  };

  const onClickRegister = (e: React.MouseEvent<HTMLSpanElement>) => {
    navigate('/auth/register');
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
