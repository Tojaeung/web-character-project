import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';

const PrivateRouter = () => {
  const user = useAppSelector(selectAuthUser);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
