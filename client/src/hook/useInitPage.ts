import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@src/store/app/hook';
import { refreshLogin } from '@src/store/requests/auth.request';
import { getProfile } from '@src/store/requests/profile.request';
import { getBoard } from '@src/store/requests/board.request';
import { getPost } from '@src/store/requests/board.request';

// 리프레쉬 로그인
export const useRefreshLogin = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (!login) return;
    dispatch(refreshLogin());
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

// 게시판
export const useGetBoard = (boardName: string) => {
  const dispatch = useAppDispatch();

  const getBoardFunction = async (boardName: string) => {
    await dispatch(getBoard({ boardName }));
  };

  useEffect(() => {
    getBoardFunction(boardName as string);
  }, [boardName]);
};

// 게시글
export const useGetPost = (postId: number) => {
  const dispatch = useAppDispatch();

  const getPostFunction = async (postId: number) => {
    await dispatch(getPost({ postId }));
  };

  useEffect(() => {
    getPostFunction(Number(postId));
  }, [postId]);
};
