import React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
// import { greenButtonStyle, greenInputStyle, redButtonStyle } from '@src/styles/GlobalStyles';
import { logoutUser } from '@src/store/requests/auth.request';
import { useAppDispatch } from '@src/store/app/hook';
import { closeModal } from '@src/store/slices/modal.slice';

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

const Container = styled.div`
  width: 40rem;
  border-radius: 10px;
  padding: 2rem;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: ${({ theme }) => theme.palette.white};
  /* display: flex;
    justify-content: center;
    flex-direction: column; */
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: 2rem;
    align-self: flex-start;
    font-weight: 700;
  }
  .content {
    align-self: flex-start;
    font-size: 1.2rem;
    line-height: 2rem;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    padding-bottom: 2rem;
  }
  .input {
  }

  .errorMessage {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.palette.red};
    align-self: flex-start;
    position: absolute;
    top: 4rem;
  }
  .closeBtn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
    align-self: flex-end;
  }
  .content {
    font-size: 1.5rem;
    padding: 2rem 0;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 1rem;
  }
  .submitBtn {
    font-size: 1.5rem;
    padding: 1rem;

    margin-right: 1rem;
  }
  .cancelBtn {
    font-size: 1.5rem;
    padding: 1rem;
    cursor: pointer;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 30rem;
    .title {
      font-size: 2rem;
    }
    .content {
      font-size: 1.3rem;
    }
    .submitBtn {
      padding: 1rem;
      font-size: 1.2rem;
    }
    .cancelBtn {
      padding: 1rem;
      font-size: 1.2rem;
    }
  }
`;

export default AccountPw;
