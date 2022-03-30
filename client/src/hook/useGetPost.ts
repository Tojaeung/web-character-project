import { useEffect } from 'react';
import { useAppDispatch } from '@src/store/app/hook';
import { getPost } from '@src/store/requests/board.request';

export const useGetPost = (postId: number) => {
  const dispatch = useAppDispatch();

  const getPostFunction = async (postId: number) => {
    await dispatch(getPost({ postId }));
  };

  useEffect(() => {
    getPostFunction(postId as number);
  }, [postId]);
};
