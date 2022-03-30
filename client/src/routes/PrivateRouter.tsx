import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouter = () => {
  const login = localStorage.getItem('login');
  return login === 'on' ? <Outlet /> : <Navigate to="/" />;
};

export const AuthRouter = () => {
  const login = localStorage.getItem('login');

  return login === 'on' ? <Navigate to="/" /> : <Outlet />;
};
