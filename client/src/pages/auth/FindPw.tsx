import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container } from '@src/pages/auth/FindPw.styled';

interface IFormInputType {
  email: string;
}

function FindPw() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    const response = await axios.post('/api/auth/findPw', data);
    const { ok, message } = response.data;
    if (ok) {
      alert(message);
      navigate('/');
    }
  };

  return (
    <Container>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__logo">기업로고</div>
        <p className="form__text">
          비밀번호를 잃어버리셨나요?😂😂
          <br /> 기업이름에 가입한 이메일을 정확히 입력해 주세요.🌙
          <br /> 이메일을 통해 비밀번호 수정 링크가 전송됩니다.🌤
          <br />
        </p>
        <input
          className="form__input"
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
        {errors.email && <div className="form__errorMessage">{errors.email.message}</div>}
        <button className="form__btn" type="submit">
          비밀번호 찾기
        </button>
      </form>
    </Container>
  );
}

export default FindPw;
