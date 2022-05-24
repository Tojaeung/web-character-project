import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/app/hook';
import { selectUserUser } from 'store/slices/user.slice';

const PublicRouter = () => {
  const user = useAppSelector(selectUserUser);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRouter;
