import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { selectUserUser } from 'store/slices/user.slice';
import { createDrawingComment } from 'store/requests/drawing.request';
import { createPostComment } from 'store/requests/post.request';
import { greenButtonStyle } from 'styles/button.style';
import socket from 'utils/socket';

interface IProp {
  type: 'drawing' | 'board';
  drawingId?: number;
  userId?: number; // post(게시글) 작성자 id(게시글 작성자에게 댓글이 생성됐다는것을 알리기 위해)
}

function CommentForm({ type, drawingId, userId }: IProp) {
  const dispatch = useAppDispatch();
  const { board, postId } = useParams();

  const user = useAppSelector(selectUserUser);

  const [content, setContent] = useState('');

  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'drawing') {
      try {
        const res = await dispatch(createDrawingComment({ drawingId: drawingId as number, content })).unwrap();
        alert(res.message);
        setContent('');
      } catch (err: any) {
        alert(err.message);
        setContent('');
      }
    }
    if (type === 'board') {
      try {
        const res = await dispatch(
          createPostComment({ board: board as string, postId: Number(postId), content })
        ).unwrap();
        alert(res.message);
        setContent('');

        // 게시물 작성자에게 댓글이 생성되었음을 알리는 알림을 보낸다.
        // 유저 자신이 자신이 생성한 게시물에 댓글를 남길때는 제외한다.
        if (user?.id !== userId) {
          const addNotificationObj = { type: 'comment', userId, board, postId: Number(postId) };
          await socket.emit('addNotification', addNotificationObj);
        }
      } catch (err: any) {
        alert(err.message);
        setContent('');
      }
    }
  };

  return (
    <Container>
      <TextArea
        placeholder="댓글 입력하세요..(최대 100글자)"
        cols={20}
        rows={3}
        wrap="hard"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <AddCommentButton onClick={handleAddComment}>등록</AddCommentButton>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.gray};
  padding: 1rem 0.5rem 3.5rem 0.5rem;
  position: relative;
`;
const TextArea = styled.textarea`
  width: 100%;
  min-height: 5rem;
  resize: none;
  outline: none;
  border: 0;
`;

const AddCommentButton = styled.button`
  position: absolute;
  bottom: 0.3rem;
  right: 0.5rem;
  ${greenButtonStyle};
  padding: 0.5rem;
`;

export default CommentForm;
