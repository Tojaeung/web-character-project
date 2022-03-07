import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { greenButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  .form {
    width: 35rem;
    border-radius: 5px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    font-size: 3rem;
    padding-bottom: 2rem;
  }

  .content {
    align-self: flex-start;
    font-size: 1.8rem;
    line-height: 2rem;
    padding-bottom: 2rem;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
  }
  .label {
    font-size: 1.4rem;
  }

  .input {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    ${greenInputStyle};
  }
  .errorMessage {
    position: absolute;
    top: 6rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.palette.red};
  }
  .submitBtn {
    width: 50%;
    font-size: 1.5rem;
    padding: 1rem 0;
    ${greenButtonStyle};
  }
`;

export default ChangePw;
