import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';

const PrivateRouter = () => {
  const user = useAppSelector(selectUserUser);

  !user && alert('로그인 후 이용 가능합니다.');

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
