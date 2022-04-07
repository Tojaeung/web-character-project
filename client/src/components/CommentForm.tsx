import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { addDrawingComment } from '@src/store/requests/drawing.request';
import { addPostComment } from '@src/store/requests/post.request';
import Button from '@src/components/Button';

interface IProp {
  type: 'drawing' | 'board';
  id: number;
}

function CommentForm({ id, type }: IProp) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const [content, setContent] = useState('');

  const onAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (content.length > 100) {
      alert('댓글 글자 수를 초과하였습니다.');
      return;
    } else if (content.length === 0) {
      alert('댓글을 입력해주세요.');
      return;
    }
    if (type === 'drawing') {
      try {
        await dispatch(addDrawingComment({ userId: user?.id!, drawingId: id, content })).unwrap();
        setContent('');
      } catch (err: any) {
        alert(err.message);
        setContent('');
      }
    } else if (type === 'board') {
      try {
        await dispatch(addPostComment({ userId: user?.id!, postId: id, content })).unwrap();
        setContent('');
      } catch (err: any) {
        alert(err.message);
        setContent('');
      }
    }
    return;
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

      <AddCommentButton color="green" size="small" onClick={onAddComment}>
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
