import { Container } from './AccountEmail.styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import axios from 'axios';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { logoutUser } from '@src/redux/requests/auth.request';

function AccountEmail() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    const res = await axios.post('/api/settings/account/email', { email: data.email }, { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    await dispatch(logoutUser());
  };

  return (
    <Container>
      <div className="title-wrapper">
        <div className="title">이메일 변경</div>
        <div className="subTitle"> * 이메일 인증 확인 후 변경이 완료됩니다.</div>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
        <button className="btn" type="submit">
          변경
        </button>
      </form>
    </Container>
  );
}

export default AccountEmail;
