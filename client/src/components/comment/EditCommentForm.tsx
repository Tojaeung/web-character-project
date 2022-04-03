import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@src/store/app/hook';
import { editDrawingComment } from '@src/store/requests/drawing.request';
import Button from '@src/components/Button';

interface IProp {
  type: 'drawing' | 'board';
  commentId: number;
  setCommentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function EditCommentForm({ type, commentId, setCommentIndex }: IProp) {
  const dispatch = useAppDispatch();

  const [editedContent, setEditedContent] = useState('');

  const handleEditComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'drawing') {
      await dispatch(editDrawingComment({ drawingCommentId: commentId, editedContent }));
      return;
    } else if (type === 'board') {
    }
  };

  // 수정폼을 닫는다.
  const closeEditCommentForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setCommentIndex(-1); // 배열 인덱스에 존재하지 않는 -1
  };

  return (
    <Container>
      <Background>
        <TextArea
          placeholder="수정하세요.."
          cols={20}
          rows={3}
          wrap="hard"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <ButtonBox>
          <EditButton color="green" size="small" onClick={handleEditComment}>
            수정
          </EditButton>
          <CancelButton color="green" size="small" inverse={true} onClick={closeEditCommentForm}>
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
const EditButton = styled(Button)`
  padding: 0.5rem;
`;
const CancelButton = styled(Button)`
  padding: 0.5rem;
`;

export default EditCommentForm;
