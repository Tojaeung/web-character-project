import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineUser, AiOutlineEye, AiOutlineMail, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';
import { openModal } from '@src/redux/slices/modal.slice';
import { useAppDispatch } from '@src/redux/app/hook';

interface IFormInputType {
  email: string;
  nickname: string;
  pw: string;
  confirmPw: string;
}

function Register() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    const response = await axios.post('/api/auth/register', data);
    const { ok, message } = response.data;
    if (!ok) return alert(message);
    await dispatch(openModal({ mode: 'registerGuide' }));
  };

  const [hidePw, setHidePw] = useState(true);
  const [hideConfirmPw, setHideConfirmPw] = useState(true);

  return (
    <Container>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="title">회원가입📃</div>

        <div className="input-wrapper">
          <label className="label" htmlFor="email">
            이메일
          </label>
          <input
            className="input"
            autoComplete="off"
            type="text"
            placeholder="이메일(Tojaeung@xxx.com)"
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
          <AiOutlineMail className="icon" />
        </div>

        <div className="input-wrapper">
          <label className="label" htmlFor="nickname">
            닉네임
          </label>
          <input
            className="input"
            autoComplete="off"
            type="text"
            placeholder="닉네임"
            style={{ borderColor: errors.nickname && 'red' }}
            {...register('nickname', {
              required: { value: true, message: '닉네임을 입력해주세요' },
              minLength: { value: 2, message: '최소 2글자 이상입니다.' },
              maxLength: { value: 10, message: '최대 10글자 이하입니다.' },
              pattern: {
                value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                message: '영어,한글,숫자를 조합할 수 있습니다.',
              },
            })}
          />
          {errors.nickname && <div className="errorMessage">{errors.nickname.message}</div>}
          <AiOutlineUser className="icon" />
        </div>

        <div className="input-wrapper">
          <label className="label" htmlFor="pw">
            비밀번호
          </label>
          <input
            className="input"
            autoComplete="off"
            type={hidePw ? 'password' : 'text'}
            placeholder="비밀번호"
            style={{ borderColor: errors.pw && 'red' }}
            {...register('pw', {
              required: { value: true, message: '비밀번호를 입력해주세요' },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                message: '영문,숫자.특수문자 조합하여 8자리 이상',
              },
            })}
          />
          {errors.pw && <div className="errorMessage">{errors.pw.message}</div>}
          {hidePw ? (
            <AiOutlineEye className="icon" onClick={() => setHidePw(false)} />
          ) : (
            <AiOutlineEyeInvisible className="icon" onClick={() => setHidePw(true)} />
          )}
        </div>

        <div className="input-wrapper">
          <label className="label" htmlFor="confirmPw">
            비밀번호 확인
          </label>
          <input
            className="input"
            autoComplete="off"
            type={hideConfirmPw ? 'password' : 'text'}
            placeholder="비밀번호 확인"
            style={{ borderColor: errors.confirmPw && 'red' }}
            {...register('confirmPw', {
              required: { value: true, message: '비밀번호를 확인해주세요' },
              validate: (value) => value === watch('pw'),
            })}
          />
          {errors.confirmPw && errors.confirmPw.type === 'required' && (
            <div className="errorMessage">{errors.confirmPw.message}</div>
          )}
          {errors.confirmPw && errors.confirmPw.type === 'validate' && (
            <div className="errorMessage">비밀번호가 일치하지 않습니다.</div>
          )}
          {hideConfirmPw ? (
            <AiOutlineEye className="icon" onClick={() => setHideConfirmPw(false)} />
          ) : (
            <AiOutlineEyeInvisible className="icon" onClick={() => setHideConfirmPw(true)} />
          )}
        </div>

        <button className="submitBtn" type="submit">
          회원가입
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 32rem;
  margin: 0 auto;
  display: flex;
  background-color: ${({ theme }) => theme.palette.white};
  justify-content: center;
  align-items: center;
  padding: 2rem;
  .form {
    width: 32rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    font-size: 3rem;
  }
  .input-wrapper {
    position: relative;
    width: 100%;
    margin: 2rem 0;
    align-self: flex-start;
  }
  .label {
    font-size: 1.5rem;
    align-self: flex-start;
  }
  .input {
    ${greenInputStyle};
  }
  .errorMessage {
    font-size: 1.3rem;
    position: absolute;
  }
  .icon {
    position: absolute;
    right: 1.5rem;
    top: 2.5rem;
    font-size: 2rem;
  }

  .submitBtn {
    ${greenButtonStyle}
    width: 100%;
    font-size: 2rem;
    margin: 2rem 0;
    padding: 1rem 0;
  }
`;

export default Register;
