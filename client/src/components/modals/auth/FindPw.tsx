import React from 'react';
import { Container } from './FindPw.styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { closeModal } from '@src/redux/slices/modal.slice';
import { useAppDispatch } from '@src/redux/app/hook';

interface IFormInputType {
  email: string;
}

function FindPw() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    const response = await axios.post('/api/auth/findPw', data);
    const { ok, message } = response.data;
    if (!ok) return alert(message);
    await dispatch(closeModal());
    alert(message);
    navigate('/');
  };

  const onClose = async (e: any) => {
    await dispatch(closeModal());
  };

  return (
    <Container>
      <AiOutlineClose className="closeBtn" onClick={onClose} />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="title">비밀번호를 잃어버리셨나요?😂😂</div>
        <div className="content">
          기업이름에 가입한 이메일을 정확히 입력해 주세요.🌙 <br />
          이메일을 통해 비밀번호 수정 링크가 전송됩니다.🌤
        </div>
        <div className="input-wrapper">
          <input
            className="input"
            placeholder="가입하셨던 이메일을 입력해주세요."
            style={{ borderColor: errors.email && 'red' }}
            {...register('email', {
              required: { value: true, message: '이메일 입력해주세요.' },
              pattern: {
                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                message: '이메일 형식이 아닙니다.',
              },
            })}
          />
          {errors.email && <div className="errorMessage">{errors.email.message}</div>}
        </div>
        <div className="btn-wrapper">
          <button className="submitBtn" type="submit">
            인증메일 보내기
          </button>
          <button className="cancelBtn" onClick={onClose}>
            취소
          </button>
        </div>
      </form>
    </Container>
  );
}

export default FindPw;
