import React from 'react';
import styled from 'styled-components';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { selectUserUser } from '@src/store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { PostLikeType, PostDisLikeType, DrawingLikeType, DrawingDisLikeType } from '@src/types';
import { createDrawingLike } from '@src/store/requests/drawing.request';
import { createPostLike } from '@src/store/requests/post.request';
import socket from '@src/utils/socket';

interface IProps {
  type: 'drawing' | 'board';
  drawingId?: number;
  userId: number;
  likes: DrawingLikeType[] | PostLikeType[];
  dislikes: DrawingDisLikeType[] | PostDisLikeType[];
}

function LikeButton({ type, drawingId, userId, likes, dislikes }: IProps) {
  const dispatch = useAppDispatch();
  const { board, postId } = useParams();

  const user = useAppSelector(selectUserUser);

  const handleAddLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const existingLike = likes.some((like) => like.user_id === user?.id);
    const existingDisLike = dislikes.some((dislike) => dislike.user_id === user?.id);
    if (type === 'drawing') {
      if (existingLike || existingDisLike) return alert('이미 선택하셨습니다.');
      try {
        await dispatch(createDrawingLike({ drawingId: drawingId as number, userId })).unwrap();
      } catch (err: any) {
        alert(err.message);
      }
    }
    if (type === 'board') {
      if (existingLike || existingDisLike) return alert('이미 선택하셨습니다.');
      try {
        const res = await dispatch(createPostLike({ postId: Number(postId), userId })).unwrap();
        alert(res.message);

        // 게시물 작성자에게 좋아요가 추가되었음을 알리는 알림을 보낸다.
        // 유저 자신이 자신이 생성한 게시물에 좋아요를 추가할때는 제외한다.
        if (user?.id !== userId) {
          const likeNotiObj = { type: 'like', userId, boardName: board, postId: Number(postId) };
          await socket.emit('addLikeNoti', likeNotiObj);
        }
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
