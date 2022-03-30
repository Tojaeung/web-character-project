import { AiOutlineClose } from 'react-icons/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import { refreshLogin } from '@src/store/requests/auth.request';
// import { greenButtonStyle, greenInputStyle, redButtonStyle } from '@src/styles/GlobalStyles';

interface IFormInputType {
  nickname: string;
}

function EditNicknameModal() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    const res = await axios.post(
      '/api/settings/account/editNickname',
      { nickname: data.nickname },
      { withCredentials: true }
    );
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    await dispatch(closeModal());
    await dispatch(refreshLogin());
  };

  const onClose = async (e: any) => {
    await dispatch(closeModal());
  };

  return (
    <Container>
      <AiOutlineClose className="closeBtn" onClick={onClose} />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="title">닉네임 변경</div>
        <div className="content">변경할 닉네임을 입력해주세요.</div>
        <div className="input-wrapper">
          <input
            className="input"
            placeholder="닉네임을 입력해주세요."
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
        <div className="btn-wrapper">
          <button className="submitBtn" type="submit">
            닉네임 변경하기
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
    font-size: 1.5rem;
    padding: 2rem 0;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
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

  .btn-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 2rem;
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

export default EditNicknameModal;
