import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container } from './AccountPw.styled';

interface IFormInputType {
  currentPw: string;
  updatedPw: string;
  confirmPw: string;
}

function AccountPw() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {};
  return (
    <Container>
      <div className="title">비밀번호 변경</div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <div>
            <input
              className="input"
              placeholder="현재 비밀번호"
              style={{ borderColor: errors.updatedPw && 'red' }}
              {...register('currentPw', {
                required: { value: true, message: '비밀번호를 입력해주세요' },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                  message: '영문,숫자.특수문자 조합하여 8자리 이상',
                },
              })}
            />
            {errors.currentPw && <div className="errorMessage">{errors.currentPw.message}</div>}
          </div>
          <div>
            <input
              className="input"
              type="password"
              placeholder="변경할 비밀번호"
              style={{ borderColor: errors.updatedPw && 'red' }}
              {...register('updatedPw', {
                required: { value: true, message: '비밀번호를 입력해주세요' },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                  message: '영문,숫자.특수문자 조합하여 8자리 이상',
                },
              })}
            />
            {errors.updatedPw && <div className="errorMessage">{errors.updatedPw.message}</div>}
          </div>
          <div>
            <input
              className="input"
              type="password"
              placeholder="비밀번호 확인"
              style={{ borderColor: errors.confirmPw && 'red' }}
              {...register('confirmPw', {
                required: { value: true, message: '비밀번호를 확인해주세요' },
                validate: (value) => value === watch('updatedPw'),
              })}
            />
            {errors.confirmPw && errors.confirmPw.type === 'required' && (
              <div className="errorMessage">{errors.confirmPw.message}</div>
            )}
            {errors.confirmPw && errors.confirmPw.type === 'validate' && (
              <div className="errorMessage">비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
        </div>
        <button className="btn" type="submit">
          변경
        </button>
      </form>
    </Container>
  );
}

export default AccountPw;
