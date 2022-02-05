import { useEffect } from 'react';
import { useAppDispatch } from '@src/redux/app/hook';
import { refreshLogin } from '@src/redux/requests/auth.request';

export const useRefreshLogin = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshLogin());
  }, [dispatch]);
};
