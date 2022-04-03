import React from 'react';
import styled from 'styled-components';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { DrawingLikeType, DrawingDisLikeType, PostLikeType, PostDisLikeType } from '@src/types';
import { addDrawingDisLike, removeDrawingLike, removeDrawingDisLike } from '@src/store/requests/drawing.request';
import { AiFillDislike, AiOutlineDislike } from 'react-icons/ai';

interface IProps {
  type: 'drawing' | 'board';
  id: number;
  likes: DrawingLikeType[] | PostLikeType[];
  dislikes: DrawingDisLikeType[] | PostDisLikeType[];
}

function DisLikeButton({ id, likes, dislikes }: IProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const onAddDisLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const existingLike = likes?.some((like) => like.user_id === user?.id);
    const existingDisLike = dislikes?.some((dislike) => dislike.user_id === user?.id);
    if (!existingLike && existingDisLike) {
      await dispatch(removeDrawingDisLike({ userId: user?.id!, drawingId: id }));
      return;
    } else if (existingLike && !existingDisLike) {
      await dispatch(addDrawingDisLike({ userId: user?.id!, drawingId: id }));
      await dispatch(removeDrawingLike({ userId: user?.id!, drawingId: id }));
      return;
    } else if (!existingLike && !existingDisLike) {
      await dispatch(addDrawingDisLike({ userId: user?.id!, drawingId: id }));
      return;
    }
    return;
  };
  return (
    <Container onClick={onAddDisLike}>
      {dislikes?.some((dislike) => dislike.user_id === user?.id) ? <ActiveDisLikeIcon /> : <NotActiveDisLikeIcon />}
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