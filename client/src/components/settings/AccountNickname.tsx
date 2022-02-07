import { Container } from './AccountNickname.styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import axios from 'axios';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { refreshLogin } from '@src/redux/requests/auth.request';

function AccountNickname() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ nickname: string }>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<{ nickname: string }> = async (data) => {
    const res = await axios.post(
      '/api/settings/account/nickname',
      { nickname: data.nickname },
      { withCredentials: true }
    );
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    reset({ nickname: '' });
    await dispatch(refreshLogin());
  };

  return (
    <Container>
      <div className="title">닉네임 변경</div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="input"
            type="text"
            placeholder={user?.nickname}
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
        <button className="btn" type="submit">
          변경
        </button>
      </form>
    </Container>
  );
}

export default AccountNickname;
