import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@src/redux/app/hook';
import { getUser } from '@src/redux/requests/profile.request';

export const useProfileGetUser = () => {
  const { id } = useParams();
  console.log(id);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser({ id: id as string }));
  }, [dispatch, id]);
};
