import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';

interface IProp {
  children: JSX.Element;
}

export const AuthPrivateRouter = ({ children }: IProp) => {
  const user = useAppSelector(selectAuthUser);
  const login = localStorage.getItem('login');

  return user && login ? <Navigate to="/" /> : children;
};

export const PrivateRouter = ({ children }: IProp) => {
  const login = localStorage.getItem('login');
  const user = useAppSelector(selectAuthUser);
  return user && login ? children : <Navigate to="/" />;
};
