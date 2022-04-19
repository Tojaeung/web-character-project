import { useEffect } from 'react';
import { useAppDispatch } from '@src/store/app/hook';
import { logoutUser, refreshLogin } from '@src/store/requests/auth.request';
import useAuth from '@src/hook/useAuth';

const useRefreshLogin = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    try {
      if (!isLoggedIn) return;
      dispatch(refreshLogin()).unwrap();
    } catch (err: any) {
      alert(err.message);
      dispatch(logoutUser());
    }
  }, [dispatch, isLoggedIn]);
};

export default useRefreshLogin;
