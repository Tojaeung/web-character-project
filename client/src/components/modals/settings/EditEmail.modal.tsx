import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { closeModal } from '@src/redux/slices/modal.slice';
import { useAppDispatch } from '@src/redux/app/hook';
import { logoutUser } from '@src/redux/requests/auth.request';
import { greenButtonStyle, greenInputStyle, redButtonStyle } from '@src/styles/GlobalStyles';

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

const Container = styled.div`
  width: 40rem;
  height: 25rem;
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
    font-size: 3rem;
    align-self: flex-start;
    font-weight: 700;
  }
  .content {
    align-self: flex-start;
    font-size: 1.2rem;
    line-height: 2rem;
  }
  .content-text {
    font-weight: 700;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }
  .input {
    ${greenInputStyle};
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
    margin-top: 2rem;
  }
  .submitBtn {
    font-size: 1.5rem;
    padding: 1rem;
    ${greenButtonStyle};
    margin-right: 1rem;
  }
  .cancelBtn {
    font-size: 1.5rem;
    padding: 1rem;
    ${redButtonStyle};
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

export default EditEmailModal;
