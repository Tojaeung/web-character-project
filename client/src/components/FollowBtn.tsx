import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { follow, unFollow } from '@src/store/requests/profile.request';
// import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';
import { FollowerType } from '@src/types';

interface IProps {
  followers: FollowerType[];
  id: number;
  nickname: string;
}

function FollowBtn({ followers, id, nickname }: IProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  // const profile = useAppSelector(selectProfileProfile);

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (followers.some((follower) => follower.from_id === user?.id)) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  }, [followers, user?.id]);

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(follow({ profileId: id, profileNickname: nickname }));
  };

  const handleUnFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(unFollow({ profileId: id, profileNickname: nickname }));
  };

  return (
    <>
      {id === user?.id ? null : (
        <Container>
          {!isFollowed ? (
            <button className="follow-btn" onClick={handleFollow}>
              팔로우
            </button>
          ) : (
            <button className="unFollow-btn" onClick={handleUnFollow}>
              언팔로우
            </button>
          )}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  .follow-btn {
    padding: 1rem;
  }
  .unFollow-btn {
    padding: 1rem;
  }
`;

export default FollowBtn;
