import { Navigate } from 'react-router-dom';

interface IProp {
  children: JSX.Element;
}

export const AuthPrivateRouter = ({ children }: IProp) => {
  const login = localStorage.getItem('login');
  return login ? <Navigate to="/" /> : children;
};

export const SettingsPrivateRouter = ({ children }: IProp) => {
  const login = localStorage.getItem('login');
  return login ? children : <Navigate to="/" />;
};

export const ProfilePrivateRouter = ({ children }: IProp) => {
  const login = localStorage.getItem('login');
  return login ? children : <Navigate to="/" />;
};

export const PhotoPrivateRouter = ({ children }: IProp) => {
  const login = localStorage.getItem('login');
  return login ? children : <Navigate to="/" />;
};
