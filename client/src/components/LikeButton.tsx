import React from 'react';
import styled from 'styled-components';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { DrawingLikeType, DrawingDisLikeType, PostLikeType, PostDisLikeType } from '@src/types';
import { addDrawingLike } from '@src/store/requests/drawing.request';
import { addPostLike } from '@src/store/requests/post.request';
import { calcExp } from '@src/store/requests/etc.request';

interface IProps {
  type: 'drawing' | 'board';
  entityId: number;
  userId: number;
  likes: DrawingLikeType[] | PostLikeType[];
  dislikes: DrawingDisLikeType[] | PostDisLikeType[];
}

function LikeButton({ type, entityId, userId, likes, dislikes }: IProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const onAddLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const existingLike = likes.some((like) => like.user_id === user?.id);
    const existingDisLike = dislikes.some((dislike) => dislike.user_id === user?.id);
    if (type === 'drawing') {
      if (existingLike || existingDisLike) {
        return alert('이미 선택하셨습니다.');
      } else {
        await dispatch(addDrawingLike({ userId: user?.id!, drawingId: entityId }));
        await dispatch(calcExp({ userId, value: 3 }));
      }
    } else {
      if (existingLike || existingDisLike) {
        return alert('이미 선택하셨습니다.');
      } else {
        await dispatch(addPostLike({ userId: user?.id!, postId: entityId }));
        await dispatch(calcExp({ userId, value: 3 }));
      }
    }
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
