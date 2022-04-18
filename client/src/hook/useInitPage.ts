import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@src/store/app/hook';
import { logoutUser, refreshLogin } from '@src/store/requests/auth.request';
import { getProfile } from '@src/store/requests/profile.request';
import { getBoards } from '@src/store/requests/board.request';
import moment from 'moment';

// 리프레쉬 로그인
export const useRefreshLogin = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const login = localStorage.getItem('login');
      if (!login) return;
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
  }, [dispatch]);
};

// 프로필
export const useGetProfile = () => {
  const { profileId } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile({ profileId: Number(profileId) }));
  }, [dispatch, profileId]);
};

// 게시판 모두 불러오기
export const useGetBoards = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBoards());
  }, []);
};

// 게시글
export const useGetPost = (postId: number) => {
  const dispatch = useAppDispatch();
};
