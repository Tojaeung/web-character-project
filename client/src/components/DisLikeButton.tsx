import React from 'react';
import styled from 'styled-components';
import { AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { selectUserUser } from '@src/store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { DrawingLikeType, DrawingDisLikeType, PostDisLikeType, PostLikeType } from '@src/types';
import { createDrawingDisLike } from '@src/store/requests/drawing.request';
import { createPostDisLike } from '@src/store/requests/post.request';

interface IProps {
  type: 'drawing' | 'board';
  entityId: number;
  userId: number;
  likes: DrawingLikeType[] | PostLikeType[];
  dislikes: DrawingDisLikeType[] | PostDisLikeType[];
}

function DisLikeButton({ type, entityId, userId, likes, dislikes }: IProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUserUser);

  const handleAddDisLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const existingLike = likes?.some((like) => like.userId === user?.id);
    const existingDisLike = dislikes?.some((dislike) => dislike.userId === user?.id);
    if (type === 'drawing') {
      if (existingLike || existingDisLike) return alert('이미 선택하셨습니다.');
      try {
        await dispatch(createDrawingDisLike({ drawingId: entityId, userId })).unwrap();
      } catch (err: any) {
        alert(err.message);
      }
    }
    if (type === 'board') {
      if (existingLike || existingDisLike) return alert('이미 선택하셨습니다.');
      try {
        await dispatch(createPostDisLike({ postId: entityId, userId })).unwrap();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <Container onClick={handleAddDisLike}>
      {dislikes?.some((dislike) => dislike.userId === user?.id) ? <ActiveDisLikeIcon /> : <NotActiveDisLikeIcon />}
      {dislikes?.length}
    </Container>
  );
}

const Container = styled.span`
  cursor: pointer;
  font-size: 1.6rem;
`;
const ActiveDisLikeIcon = styled(AiFillDislike)``;
const NotActiveDisLikeIcon = styled(AiOutlineDislike)``;

export default DisLikeButton;
