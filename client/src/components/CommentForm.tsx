import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@src/store/app/hook';
import { createDrawingComment } from '@src/store/requests/drawing.request';
import { createPostComment } from '@src/store/requests/post.request';
import { greenButtonStyle } from '@src/styles/button.style';
import socket from '@src/utils/socket';

interface IProp {
  type: 'drawing' | 'board';
  entityId: number; // post(게시글) id 또는 drawing(그림) id
  userId?: number; // post(게시글) 작성자 id(게시글 작성자에게 댓글이 생성됐다는것을 알리기 위해)
}

function CommentForm({ type, entityId, userId }: IProp) {
  const dispatch = useAppDispatch();
  const { board } = useParams();

  const [content, setContent] = useState('');

  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'drawing') {
      try {
        const res = await dispatch(createDrawingComment({ drawingId: entityId, content })).unwrap();
        alert(res.message);
        setContent('');
      } catch (err: any) {
        alert(err.message);
        setContent('');
      }
    }
    if (type === 'board') {
      try {
        const res = await dispatch(createPostComment({ board: board as string, postId: entityId, content })).unwrap();
        alert(res.message);
        setContent('');

        // 게시글 작성자에게 알림 보내기
        const commentNotiObj = { type: 'comment', userId, postId: entityId };
        await socket.emit('addCommentNoti', commentNotiObj);
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
