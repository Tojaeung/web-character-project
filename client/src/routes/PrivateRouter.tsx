import { Navigate } from 'react-router-dom';

interface IProp {
  children: JSX.Element;
}

export const AuthPrivateRouter = ({ children }: IProp) => {
  const login = localStorage.getItem('login');

  return login === 'on' ? <Navigate to="/" /> : children;
};

export const PrivateRouter = ({ children }: IProp) => {
  const login = localStorage.getItem('login');

  return login === 'on' ? children : <Navigate to="/" />;
};
