import React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
// import { greenInputStyle, greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';

interface IFormInputType {
  email: string;
}

function FindPw() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    const response = await axios.post('/api/auth/findPw', data);
    const { ok, message } = response.data;
    if (!ok) return alert(message);
    await dispatch(closeModal());
    alert(message);
    navigate('/');
  };

  const onClose = async (e: any) => {
    await dispatch(closeModal());
  };

  return (
    <Container>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <AiOutlineClose className="closeBtn" onClick={onClose} />
        <div className="title">비밀번호를 잃어버리셨나요?😂😂</div>
        <div className="content">
          기업이름에 가입한 이메일을 정확히 입력해 주세요.🌙 이메일을 통해 비밀번호 수정 링크가 전송됩니다.🌤
        </div>
        <div className="input-wrapper">
          <input
            className="input"
            autoComplete="off"
            placeholder="가입하셨던 이메일을 입력해주세요."
            style={{ borderColor: errors.email && 'red' }}
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
  border-radius: 10px;
  padding: 2rem;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: ${({ theme }) => theme.palette.white};

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .title {
    font-size: 2rem;
    align-self: flex-start;
    font-weight: 700;
  }
  .content {
    text-align: left;
    font-size: 1.5rem;
    line-height: 2rem;
  }
  .input-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    position: relative;
  }
  .input {
  }

  .errorMessage {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.palette.red};
    align-self: flex-start;
    position: absolute;
    top: 4rem;
  }
  .closeBtn {
    /* position: absolute; */
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
    align-self: flex-end;
  }

  .btn-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
  }
  .submitBtn {
    font-size: 1.5rem;
    padding: 1.2rem;

    margin-right: 1rem;
  }
  .cancelBtn {
    font-size: 1.5rem;
    padding: 1.2rem;
    cursor: pointer;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 30rem;
    .title {
      font-size: 1.7rem;
    }
    .content {
      font-size: 1.3rem;
    }
    .submitBtn {
      font-size: 1.2rem;
      padding: 1rem;
    }
    .cancelBtn {
      font-size: 1.2rem;
      padding: 1rem;
    }
  }
`;

export default FindPw;
