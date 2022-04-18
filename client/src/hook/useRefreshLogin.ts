import { useEffect } from 'react';
import moment from 'moment';
import { useAppDispatch } from '@src/store/app/hook';
import { logoutUser, refreshLogin } from '@src/store/requests/auth.request';
import useAuth from '@src/hook/useAuth';

const useRefreshLogin = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    try {
      if (isLoggedIn) return;
      dispatch(refreshLogin())
        .unwrap()
        .then((res) => {
          const { user } = res;

          // 관리자 유무 확인
          if (user?.role === 'admin') return localStorage.setItem('admin', 'ok');
          localStorage.removeItem('admin');

          // 패널티를 먹은 불량유저인지 확인
          if (user?.exp === null && localStorage.getItem('penalty')) {
            console.log(456);

            return;
          } else if (user?.exp === null && !localStorage.getItem('penalty')) {
            console.log(123);

            const startDate = moment().format();
            const expireDate = moment().add(3, 'minute').format();
            const penalty = { startDate, expireDate };

            return localStorage.setItem('penalty', JSON.stringify(penalty));
          }
        });
    } catch (err: any) {
      alert(err.message);
      dispatch(logoutUser());
    }
  }, [dispatch, isLoggedIn]);
};

export default useRefreshLogin;
