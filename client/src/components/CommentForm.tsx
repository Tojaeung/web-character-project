import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineComment } from 'react-icons/ai';
import { DrawingCommentType, PostCommentType } from '@src/types';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { addDrawingComment } from '@src/store/requests/drawing.request';
import Button from '@src/components/Button';

interface IProp {
  type: 'drawing' | 'board';
  id: number;
  comments: DrawingCommentType[] | PostCommentType[];
}

function CommentForm({ id, comments, type }: IProp) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const [content, setContent] = useState('');

  const onAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'drawing') {
      await dispatch(addDrawingComment({ userId: user?.id!, drawingId: id, content }));
      setContent('');
      return;
    } else if (type === 'board') {
    }
    return;
  };

  return (
    <Container>
      <TextArea
        placeholder="댓글을 입력하세요.."
        cols={20}
        rows={3}
        wrap="hard"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <FormBottomBox>
        <CommentCount>
          <CommentIcon />
          {comments.length}
        </CommentCount>

        <AddCommentButton color="green" size="small" onClick={onAddComment}>
          등록
        </AddCommentButton>
      </FormBottomBox>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.gray};
  padding: 1rem 0.5rem 0rem 0.5rem;
`;
const TextArea = styled.textarea`
  width: 100%;
  min-height: 5rem;
  resize: none;
  outline: none;
  border: 0;
`;
const FormBottomBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`;
const CommentCount = styled.span`
  display: flex;
  align-items: center;
`;
const AddCommentButton = styled(Button)``;
const CommentIcon = styled(AiOutlineComment)`
  font-size: 2rem;
`;

export default CommentForm;
