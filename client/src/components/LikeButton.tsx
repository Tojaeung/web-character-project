import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { selectUserUser } from '@src/store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import {
  DrawingLikeType,
  DrawingDisLikeType,
  FreeLikeType,
  CommissionLikeType,
  RequeLikeType,
  SaleLikeType,
  FreeDisLikeType,
  CommissionDisLikeType,
  RequeDisLikeType,
  SaleDisLikeType,
} from '@src/types';
import { createDrawingLike } from '@src/store/requests/drawing.request';
import { createPostLike } from '@src/store/requests/post.request';

interface IProps {
  type: 'drawing' | 'board';

  entityId: number;
  userId: number;
  likes: DrawingLikeType[] | FreeLikeType[] | CommissionLikeType[] | RequeLikeType[] | SaleLikeType[];
  dislikes: DrawingDisLikeType[] | FreeDisLikeType[] | CommissionDisLikeType[] | RequeDisLikeType[] | SaleDisLikeType[];
}

function LikeButton({ type, entityId, userId, likes, dislikes }: IProps) {
  const dispatch = useAppDispatch();
  const { board } = useParams();

  const user = useAppSelector(selectUserUser);

  const handleAddLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const existingLike = likes.some((like) => like.user_id === user?.id);
    const existingDisLike = dislikes.some((dislike) => dislike.user_id === user?.id);
    if (type === 'drawing') {
      if (existingLike || existingDisLike) return alert('이미 선택하셨습니다.');
      try {
        await dispatch(createDrawingLike({ drawingId: entityId, userId })).unwrap();
      } catch (err: any) {
        alert(err.message);
      }
    }
    if (type === 'board') {
      if (existingLike || existingDisLike) return alert('이미 선택하셨습니다.');
      try {
        await dispatch(createPostLike({ board: board as string, postId: entityId, userId })).unwrap();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <Container onClick={handleAddLike}>
      {likes?.some((like) => like.user_id === user?.id) ? <ActiveLikeIcon /> : <NotActiveLikeIcon />}
      {likes?.length}
    </Container>
  );
}

const Container = styled.span`
  cursor: pointer;
  font-size: 1.6rem;
`;
const ActiveLikeIcon = styled(AiFillLike)``;
const NotActiveLikeIcon = styled(AiOutlineLike)``;
export default LikeButton;
