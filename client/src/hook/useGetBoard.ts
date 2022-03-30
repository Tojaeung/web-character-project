import { useEffect } from 'react';
import { getBoard } from '@src/store/requests/board.request';
import { useAppDispatch } from '@src/store/app/hook';

export const useGetBoard = (boardName: string) => {
  const dispatch = useAppDispatch();

  const getBoardFunction = async (boardName: string) => {
    await dispatch(getBoard({ boardName }));
  };

  useEffect(() => {
    getBoardFunction(boardName as string);
  }, [boardName]);
};
