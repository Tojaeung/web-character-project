import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container } from './AccountInput.styled';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';

interface IProp {
  type: string;
}

interface IFormInputType {
  email?: string;
  nickname?: string;
}

function AccountInput({ type }: IProp) {
  const user = useAppSelector(selectAuthUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {};

  return (
    <Container>
      <div className="title-wrapper">
        <div className="title">{type === 'email' ? '이메일 변경' : '닉네임 변경'}</div>
        <div className="subtitle">{type === 'email' && '※ 이메일 인증 완료 후 변경이 완료됩니다.'}</div>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {type === 'email' ? (
          <div>
            <input
              className="input"
              placeholder={user?.email}
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
        ) : (
          <div>
            <input
              className="input"
              type="text"
              placeholder={user?.nickname}
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
          </div>
        )}

        <button className="btn" type="submit">
          변경
        </button>
      </form>
    </Container>
  );
}

export default AccountInput;
