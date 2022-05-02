import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@src/store/app/hook';
import { createDrawingComment } from '@src/store/requests/drawing.request';
import { createPostComment } from '@src/store/requests/board.request';
import Button from '@src/components/Button';

interface IProp {
  type: 'drawing' | 'board';
  entityId: number;
}

function CommentForm({ type, entityId }: IProp) {
  const dispatch = useAppDispatch();
  const { board } = useParams();

  const [content, setContent] = useState('');

  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'drawing') {
      try {
        await dispatch(createDrawingComment({ drawingId: entityId, content })).unwrap();
        setContent('');
      } catch (err: any) {
        alert(err.message);
      }
    }
    if (type === 'board') {
      try {
        await dispatch(createPostComment({ board: board as string, postId: entityId, content })).unwrap();
        setContent('');
      } catch (err: any) {
        alert(err.message);
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

      <AddCommentButton color="green" size="small" onClick={handleAddComment}>
        등록
      </AddCommentButton>
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

const AddCommentButton = styled(Button)`
  position: absolute;
  bottom: 0.3rem;
  right: 0.5rem;

  padding: 0.5rem;
`;

export default CommentForm;
