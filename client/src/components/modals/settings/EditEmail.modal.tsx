import React from 'react';
import { Container } from './EditEmail.modal.styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { closeModal } from '@src/redux/slices/modal.slice';
import { useAppDispatch } from '@src/redux/app/hook';
import { logoutUser } from '@src/redux/requests/auth.request';

interface IFormInputType {
  email: string;
}

function EditEmailModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    const res = await axios.post('/api/settings/account/editEmail', { email: data.email }, { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    await dispatch(closeModal());
    alert(message);
    await dispatch(logoutUser());
    navigate('/');
  };

  const onClose = async (e: any) => {
    await dispatch(closeModal());
  };

  return (
    <Container>
      <AiOutlineClose className="closeBtn" onClick={onClose} />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="title">이메일 변경</div>
        <div className="content">
          변경할 이메일 주소를 정확하게 입력해주세요.🔍🔍
          <br />
          <span className="content-text">'인증메일'</span>이 전송됩니다.
        </div>
        <div className="input-wrapper">
          <input
            className="input"
            placeholder="이메일을 입력해주세요."
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

export default EditEmailModal;
