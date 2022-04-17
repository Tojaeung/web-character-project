import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@src/store/app/hook';
import { logoutUser, refreshLogin } from '@src/store/requests/auth.request';
import { getProfile } from '@src/store/requests/profile.request';
import { getBoards } from '@src/store/requests/board.request';

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
          if (user?.role === 'admin') {
            localStorage.setItem('admin', 'ok');
          } else {
            localStorage.removeItem('admin');
          }

          // 패널티를 먹은 불량유저인지 확인
          if (user?.exp === null) {
            localStorage.setItem('penalty_user', 'ok');
          } else {
            localStorage.removeItem('penalty_user');
          }
          return;
        });
    } catch (err: any) {
      alert(err.message);
      dispatch(logoutUser());
      localStorage.clear();
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
