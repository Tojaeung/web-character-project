import React from 'react';
import { Container } from './EditPw.modal.styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { logoutUser } from '@src/redux/requests/auth.request';
import { useAppDispatch } from '@src/redux/app/hook';
import { closeModal } from '@src/redux/slices/modal.slice';

interface IFormInputType {
  currentPw: string;
  newPw: string;
  confirmPw: string;
}

function AccountPw() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    const res = await axios.post(
      '/api/settings/account/editPw',
      { currentPw: data.currentPw, newPw: data.newPw },
      { withCredentials: true }
    );
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    await dispatch(logoutUser());
  };

  const onClose = async (e: any) => {
    await dispatch(closeModal());
  };

  return (
    <Container>
      <AiOutlineClose className="closeBtn" onClick={onClose} />

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="title">비밀번호 변경</div>

        <div className="content">변경할 비밀번호를 입력해주세요.</div>

        <div className="input-wrapper">
          <input
            className="input"
            type="password"
            placeholder="현재 비밀번호"
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
        <div className="input-wrapper">
          <input
            className="input"
            type="password"
            placeholder="변경할 비밀번호"
            {...register('newPw', {
              required: { value: true, message: '비밀번호를 입력해주세요' },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                message: '영문,숫자.특수문자 조합하여 8자리 이상',
              },
            })}
          />
          {errors.newPw && <div className="errorMessage">{errors.newPw.message}</div>}
        </div>
        <div className="input-wrapper">
          <input
            className="input"
            type="password"
            placeholder="비밀번호 확인"
            {...register('confirmPw', {
              required: { value: true, message: '비밀번호를 확인해주세요' },
              validate: (value) => value === watch('newPw'),
            })}
          />
          {errors.confirmPw && errors.confirmPw.type === 'required' && (
            <div className="errorMessage">{errors.confirmPw.message}</div>
          )}
          {errors.confirmPw && errors.confirmPw.type === 'validate' && (
            <div className="errorMessage">비밀번호가 일치하지 않습니다.</div>
          )}
        </div>

        <div className="btn-wrapper">
          <button className="submitBtn" type="submit">
            비밀번호 변경하기
          </button>
          <button className="cancelBtn" onClick={onClose}>
            취소
          </button>
        </div>
      </form>
    </Container>
  );
}

export default AccountPw;
