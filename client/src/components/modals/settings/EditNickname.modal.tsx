import { Container } from './EditNickname.modal.styled';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { closeModal } from '@src/redux/slices/modal.slice';
import { useAppDispatch } from '@src/redux/app/hook';
import { refreshLogin } from '@src/redux/requests/auth.request';

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

export default EditNicknameModal;
