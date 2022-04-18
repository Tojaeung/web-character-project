import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@src/hook/useAuth';

const PrivateRouter = () => {
  const { isLoggedIn } = useAuth();

  !isLoggedIn && alert('로그인 후 이용가능한 서비스입니다.');

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
