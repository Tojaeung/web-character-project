import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';

interface IProp {
  children: JSX.Element;
}

export const AuthPrivateRouter = ({ children }: IProp) => {
  const user = useAppSelector(selectAuthUser);

  return user ? <Navigate to="/" /> : children;
};

export const SettingsPrivateRouter = ({ children }: IProp) => {
  const user = useAppSelector(selectAuthUser);

  return user ? children : <Navigate to="/" />;
};
