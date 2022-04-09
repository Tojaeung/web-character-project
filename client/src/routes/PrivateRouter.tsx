import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouter = () => {
  const login = localStorage.getItem('login');
  if (!login) {
    alert('로그인 후 이용 가능합니다.');
  }

  return login === 'on' ? <Outlet /> : <Navigate to="/" />;
};

export const AuthRouter = () => {
  const login = localStorage.getItem('login');

  return login === 'on' ? <Navigate to="/" /> : <Outlet />;
};
