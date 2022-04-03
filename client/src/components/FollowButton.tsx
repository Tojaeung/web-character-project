import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { follow, unFollow } from '@src/store/requests/profile.request';
import { FollowerType } from '@src/types';
import Button from '@src/components/Button';

interface IProps {
  followers: FollowerType[];
  id: number;
  nickname: string;
}

function FollowButton({ followers, id, nickname }: IProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

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
            <FollowBtn color="green" size="small" onClick={handleFollow}>
              팔로우
            </FollowBtn>
          ) : (
            <UnFollowButton color="red" size="small" onClick={handleUnFollow}>
              언팔로우
            </UnFollowButton>
          )}
        </Container>
      )}
    </>
  );
}

const Container = styled.div``;
const FollowBtn = styled(Button)``;
const UnFollowButton = styled(Button)``;

export default FollowButton;
