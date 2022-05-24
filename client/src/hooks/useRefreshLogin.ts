import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { refreshLogin, signOut } from 'store/requests/session.request';
import { selectUserUser } from 'store/slices/user.slice';

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
