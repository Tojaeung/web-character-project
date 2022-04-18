import { useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';

const useAuth = () => {
  const user = useAppSelector(selectAuthUser);

  return { isLoggedIn: user ? true : false };
};

export default useAuth;
