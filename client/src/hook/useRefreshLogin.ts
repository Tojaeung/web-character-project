import { useEffect } from 'react';
import { useAppDispatch } from '@src/redux/app/hook';
import { refreshLogin } from '@src/redux/requests/auth.request';

export const useRefreshLogin = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const login = localStorage.getItem('login');
    if (!login) return;
    dispatch(refreshLogin()).then((res) => {
      if (!res.payload?.ok) {
        localStorage.clear();
        return;
      }
    });
  }, [dispatch]);
};
