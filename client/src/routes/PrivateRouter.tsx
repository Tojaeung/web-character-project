import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';

const PrivateRouter = () => {
  const user = useAppSelector(selectUserUser);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
