import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';

const PublicRouter = () => {
  const user = useAppSelector(selectAuthUser);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRouter;
