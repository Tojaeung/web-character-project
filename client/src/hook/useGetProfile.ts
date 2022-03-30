import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@src/store/app/hook';
import { getProfile } from '@src/store/requests/profile.request';

export const useGetProfile = () => {
  const { profileId } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile({ profileId: Number(profileId) }));
  }, [dispatch, profileId]);
};
