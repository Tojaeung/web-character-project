import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';
import { addDrawingComment } from '@src/store/requests/drawing.request';
import { addPostComment } from '@src/store/requests/post.request';
import Button from '@src/components/Button';
import { calcExp } from '@src/store/requests/etc.request';

interface IProp {
  type: 'drawing' | 'board';
  entityId: number;
}

function CommentForm({ entityId, type }: IProp) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUserUser);

  const [content, setContent] = useState('');

  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'drawing') {
      try {
        await dispatch(addDrawingComment({ userId: user?.id!, drawingId: entityId, content })).unwrap();
        await dispatch(calcExp({ value: 1 }));
        setContent('');
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      try {
        await dispatch(addPostComment({ userId: user?.id!, postId: entityId, content })).unwrap();
        await dispatch(calcExp({ value: 1 }));
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
