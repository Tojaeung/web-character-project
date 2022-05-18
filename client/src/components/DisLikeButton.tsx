import React from 'react';
import styled from 'styled-components';
import { AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { selectUserUser } from '@src/store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { DrawingLikeType, DrawingDisLikeType, PostDisLikeType, PostLikeType } from '@src/types';
import { createDrawingDisLike } from '@src/store/requests/drawing.request';
import { createPostDisLike } from '@src/store/requests/post.request';
import socket from '@src/utils/socket';

interface IProps {
  type: 'drawing' | 'board';
  drawingId?: number;
  userId: number;
  likes: DrawingLikeType[] | PostLikeType[];
  dislikes: DrawingDisLikeType[] | PostDisLikeType[];
}

function DisLikeButton({ type, drawingId, userId, likes, dislikes }: IProps) {
  const dispatch = useAppDispatch();
  const { board, postId } = useParams();
  const user = useAppSelector(selectUserUser);

  const handleAddDisLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const existingLike = likes?.some((like) => like.user_id === user?.id);
    const existingDisLike = dislikes?.some((dislike) => dislike.user_id === user?.id);
    if (type === 'drawing') {
      if (existingLike || existingDisLike) return alert('이미 선택하셨습니다.');
      try {
        await dispatch(createDrawingDisLike({ drawingId: drawingId as number, userId })).unwrap();
      } catch (err: any) {
        alert(err.message);
      }
    }
    if (type === 'board') {
      if (existingLike || existingDisLike) return alert('이미 선택하셨습니다.');
      try {
        const res = await dispatch(createPostDisLike({ postId: Number(postId), userId })).unwrap();
        alert(res.message);
        // 게시물 작성자에게 싫어요가 추가되었음을 알리는 알림을 보낸다.
        // 유저 자신이 자신이 생성한 게시물에 싫어요를 추가할때는 제외한다.
        if (user?.id !== userId) {
          const addNotificationObj = { type: 'dislike', userId, board, postId: Number(postId) };
          await socket.emit('addNotification', addNotificationObj);
        }
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <Container onClick={handleAddDisLike}>
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
