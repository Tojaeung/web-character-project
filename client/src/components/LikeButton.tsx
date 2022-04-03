import React from 'react';
import styled from 'styled-components';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { DrawingLikeType, DrawingDisLikeType, PostLikeType, PostDisLikeType } from '@src/types';
import { addDrawingLike, removeDrawingLike, removeDrawingDisLike } from '@src/store/requests/drawing.request';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

interface IProps {
  type: 'drawing' | 'board';
  id: number;
  likes: DrawingLikeType[] | PostLikeType[];
  dislikes: DrawingDisLikeType[] | PostDisLikeType[];
}

function LikeButton({ id, likes, dislikes }: IProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const onAddLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const existingLike = likes.some((like) => like.user_id === user?.id);
    const existingDisLike = dislikes.some((dislike) => dislike.user_id === user?.id);
    if (existingLike && !existingDisLike) {
      await dispatch(removeDrawingLike({ userId: user?.id!, drawingId: id }));
      return;
    } else if (!existingLike && existingDisLike) {
      await dispatch(addDrawingLike({ userId: user?.id!, drawingId: id }));
      await dispatch(removeDrawingDisLike({ userId: user?.id!, drawingId: id }));
      return;
    } else if (!existingLike && !existingDisLike) {
      await dispatch(addDrawingLike({ userId: user?.id!, drawingId: id }));
      return;
    }
    return;
  };

  return (
    <Container onClick={onAddLike}>
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