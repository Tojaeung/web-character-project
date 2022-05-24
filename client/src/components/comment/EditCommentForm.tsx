import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'store/app/hook';
import { updateDrawingComment } from 'store/requests/drawing.request';
import { updatePostComment } from 'store/requests/post.request';
import { greenButtonStyle, inverseGreenButtonStyle } from 'styles/button.style';

interface IProp {
  type: 'drawing' | 'board';
  commentId: number;
  setCommentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function EditCommentForm({ type, commentId, setCommentIndex }: IProp) {
  const dispatch = useAppDispatch();

  const [content, setContent] = useState('');

  const handleEditComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'drawing') {
      try {
        await dispatch(updateDrawingComment({ commentId: commentId, updatedContent: content })).unwrap();
        setContent('');
      } catch (err: any) {
        alert(err.message);
      }
    }
    if (type === 'board') {
      try {
        await dispatch(updatePostComment({ commentId: commentId, updatedContent: content }))
          .unwrap()
          .then((res) => {
            const { message } = res;
            alert(message);
          });
        setContent('');
      } catch (err: any) {
        // alert(err.message);
      }
    }

    setCommentIndex(-1);
  };

  // 수정폼을 닫는다.
  const closeEditCommentForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setCommentIndex(-1); // 배열 인덱스에 존재하지 않는 -1
  };

  return (
    <Container>
      <Background>
        <TextArea
          placeholder="수정하세요.. (최대 100글자)"
          cols={20}
          rows={3}
          wrap="hard"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ButtonBox>
          <EditButton onClick={handleEditComment}>수정</EditButton>
          <CancelButton onClick={closeEditCommentForm}>취소</CancelButton>
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
const EditButton = styled.button`
  padding: 0.5rem;
  ${greenButtonStyle};
`;
const CancelButton = styled.button`
  padding: 0.5rem;
  ${inverseGreenButtonStyle}
`;

export default EditCommentForm;
