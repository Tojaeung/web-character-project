import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@src/redux/app/hook';
import { getUser } from '@src/redux/requests/profile.request';

export const useProfileGetUser = () => {
  const { userId } = useParams();
  console.log(userId);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser({ id: userId as string }));
  }, [dispatch, userId]);
};
