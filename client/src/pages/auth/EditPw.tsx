import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from './EditPw.styled';

interface IFormInputType {
  pw: string;
  confirmPw?: string;
}

function ChangePw() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    delete data.confirmPw;
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const res = await axios.post('/api/auth/editPw', { pw: data.pw, pwToken: query.pwToken });
    const { ok, message } = res.data;
    if (ok!) return alert(message);
    alert(message);
    navigate('/');
  };

  return (
    <Container>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="logo">기업로고</div>
        <p className="content">변경할 비밀번호를 입력해주세요. 🔐</p>

        <div className="input-wrapper">
          <label className="label">새 비밀번호</label>
          <input
            className="input"
            type="password"
            placeholder="비밀번호"
            {...register('pw', {
              required: { value: true, message: '비밀번호를 입력해주세요' },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                message: '영문,숫자.특수문자 조합하여 8자리 이상',
              },
            })}
          />
          {errors.pw && <div className="errorMessage">{errors.pw.message}</div>}
        </div>

        <div className="input-wrapper">
          <label className="label">새 비밀번호 확인</label>
          <input
            className="input"
            type="password"
            placeholder="비밀번호 확인"
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
        </div>

        <button className="submitBtn" type="submit">
          비밀번호 변경
        </button>
      </form>
    </Container>
  );
}

export default ChangePw;
