import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';

const PublicRouter = () => {
  const user = useAppSelector(selectUserUser);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRouter;
