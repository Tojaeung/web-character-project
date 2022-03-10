import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@src/redux/app/hook';
import { getProfile } from '@src/redux/requests/profile.request';

export const useProfileGetUser = () => {
  const { profileId } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile({ profileId: Number(profileId) }));
  }, [dispatch, profileId]);
};
