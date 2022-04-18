import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@src/hook/useAuth';

const PublicRouter = () => {
  const { isLoggedIn } = useAuth();

  isLoggedIn && alert('이미 로그인 하셨습니다.');

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRouter;
