import React from 'react';
import styled from 'styled-components';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { DrawingLikeType, DrawingDisLikeType, PostLikeType, PostDisLikeType } from '@src/types';
import { addDrawingLike, removeDrawingLike, removeDrawingDisLike } from '@src/store/requests/drawing.request';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

interface IProps {
  id: number;
  likes: DrawingLikeType[] | PostLikeType[];
  dislikes: DrawingDisLikeType[] | PostDisLikeType[];
  category: string;
}

function LikeBtn({ id, likes, dislikes, category }: IProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const onAddLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    if (category === 'drawing') {
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
    }
  };

  return (
    <Container>
      <span onClick={onAddLike}>
        {likes?.some((like) => like.user_id === user?.id) ? <AiFillLike /> : <AiOutlineLike />}
        {likes?.length}
      </span>
    </Container>
  );
}

const Container = styled.div`
  span {
    cursor: pointer;
    font-size: 1.6rem;
  }
`;

export default LikeBtn;
