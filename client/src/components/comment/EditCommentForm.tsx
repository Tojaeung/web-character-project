import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@src/store/app/hook';
import { editDrawingComment } from '@src/store/requests/drawing.request';
import Button from '@src/components/Button';

interface IProp {
  commentId: number;
  category: string;
}

function EditCommentForm({ commentId, category }: IProp) {
  const dispatch = useAppDispatch();

  const [editedContent, setEditedContent] = useState('');

  const onEditComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (category === 'drawing') {
      await dispatch(editDrawingComment({ drawingCommentId: commentId, editedContent }));
      return;
    }
  };

  return (
    <Container>
      <Background>
        <TextArea
          placeholder="댓글을 입력하세요.."
          cols={20}
          rows={3}
          wrap="hard"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <ButtonBox>
          <EditButton color="green" size="small" onClick={onEditComment}>
            등록
          </EditButton>
          <CancelButton color="green" size="small" inverse={true}>
            취소
          </CancelButton>
        </ButtonBox>
      </Background>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Background = styled.div`
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
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;
const EditButton = styled(Button)``;
const CancelButton = styled(Button)``;

export default EditCommentForm;
