import React from 'react';
import styled from 'styled-components';
import { AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { DrawingLikeType, DrawingDisLikeType, PostLikeType, PostDisLikeType } from '@src/types';
import { addDrawingDisLike } from '@src/store/requests/drawing.request';
import { addPostDisLike } from '@src/store/requests/post.request';
import { calcExp } from '@src/store/requests/etc.request';

interface IProps {
  type: 'drawing' | 'board';
  entityId: number;
  userId: number;
  likes: DrawingLikeType[] | PostLikeType[];
  dislikes: DrawingDisLikeType[] | PostDisLikeType[];
}

function DisLikeButton({ type, entityId, userId, likes, dislikes }: IProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const onAddDisLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const existingLike = likes?.some((like) => like.user_id === user?.id);
    const existingDisLike = dislikes?.some((dislike) => dislike.user_id === user?.id);
    if (type === 'drawing') {
      if (existingLike || existingDisLike) {
        return alert('이미 선택하셨습니다.');
      } else {
        try {
          await dispatch(addDrawingDisLike({ userId: user?.id!, drawingId: entityId })).unwrap();
          await dispatch(calcExp({ userId, value: -1 }));
        } catch (err: any) {
          alert(err.message);
        }
      }
    } else {
      if (existingLike || existingDisLike) {
        return alert('이미 선택하셨습니다.');
      } else {
        try {
          await dispatch(addPostDisLike({ userId: user?.id!, postId: entityId })).unwrap();
          await dispatch(calcExp({ userId, value: -1 }));
        } catch (err: any) {
          alert(err.message);
        }
      }
    }
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
