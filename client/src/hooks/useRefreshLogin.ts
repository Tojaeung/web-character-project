import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { refreshLogin, signOut } from '@src/store/requests/session.request';
import { selectUserUser } from '@src/store/slices/user.slice';

const useRefreshLogin = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserUser);

  useEffect(() => {
    try {
      if (!user) return;
      dispatch(refreshLogin()).unwrap();
    } catch (err: any) {
      alert(err.message);
      dispatch(signOut);
      localStorage.clear();
    }
  }, []);
};

export default useRefreshLogin;
