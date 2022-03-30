import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@src/store/app/hook';
import { editDrawingComment } from '@src/store/requests/drawing.request';
// import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';

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
      <div className="textarea-background">
        <textarea
          placeholder="댓글을 입력하세요.."
          cols={20}
          rows={3}
          wrap="hard"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <div className="btn">
          <button className="editComment-btn" onClick={onEditComment}>
            등록
          </button>
          <button className="cancel-btn">취소</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .textarea-background {
    background-color: ${({ theme }) => theme.palette.gray};
    padding: 1rem 0.5rem 0rem 0.5rem;

    textarea {
      width: 100%;
      min-height: 5rem;
      resize: none;
      outline: none;
      border: 0;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 0.5rem 0;
      .editComment-btn {
      }
      .cancel-btn {
      }
    }
  }
`;

export default EditCommentForm;
