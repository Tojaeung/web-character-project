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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__logo">기업로고</div>
        <p className="form__guideText">변경할 비밀번호를 입력해주세요.✒✒</p>

        <div className="form__input-wrapper">
          <div className="form__input">
            <label className="form__input-label">새 비밀번호</label>
            <input
              className="form__input-entry"
              type="password"
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
            {errors.pw && <div className="form__input-errorMessage">{errors.pw.message}</div>}
          </div>

          <div className="form__input">
            <label className="form__input-label">새 비밀번호 확인</label>
            <input
              className="form__input-entry"
              type="password"
              placeholder="비밀번호 확인"
              style={{ borderColor: errors.confirmPw && 'red' }}
              {...register('confirmPw', {
                required: { value: true, message: '비밀번호를 확인해주세요' },
                validate: (value) => value === watch('pw'),
              })}
            />
            {errors.confirmPw && errors.confirmPw.type === 'required' && (
              <div className="form__input-errorMessage">{errors.confirmPw.message}</div>
            )}
            {errors.confirmPw && errors.confirmPw.type === 'validate' && (
              <div className="form__input-errorMessage">비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
        </div>
        <button className="form__submit-btn" type="submit">
          비밀번호 변경
        </button>
      </form>
    </Container>
  );
}

export default ChangePw;
