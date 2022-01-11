import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import qs from 'qs';

import { IFormInputType } from '@src/types/ChangePw.type';
import { Container } from '@src/styles/ChangePw.styled';

function ChangePw() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    delete data.confirmPw;
    const query = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    const res = await axios.post('/api/changePw', { pw: data.pw, pwToken: query.pwToken });
    const { status } = res.data;
    console.log(status);
  };

  return (
    <Container>
      <form className="block" onSubmit={handleSubmit(onSubmit)}>
        <div className="block__logo">기업로고</div>
        <p className="block__text">변경할 비밀번호를 입력해주세요.✒✒</p>
        <input
          className="block__input"
          placeholder="새로운 비밀번호"
          style={{ borderColor: errors.pw && 'red' }}
          {...register('pw', {
            required: { value: true, message: '비밀번호를 입력해주세요' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
              message: '영문,숫자.특수문자 조합하여 8자리 이상',
            },
          })}
        />
        <input
          className="block__input"
          placeholder="새로운 비밀번호 확인"
          style={{ borderColor: errors.confirmPw && 'red' }}
          {...register('confirmPw', {
            required: { value: true, message: '비밀번호를 확인해주세요' },
            validate: (value) => value === watch('pw'),
          })}
        />
        {errors.confirmPw && errors.confirmPw.type === 'required' && (
          <div className="block__errorMessage">{errors.confirmPw.message}</div>
        )}
        {errors.confirmPw && errors.confirmPw.type === 'validate' && (
          <div className="block__errorMessage">비밀번호가 일치하지 않습니다.</div>
        )}

        <button className="block__btn" type="submit">
          비밀번호 변경
        </button>
      </form>
    </Container>
  );
}

export default ChangePw;
