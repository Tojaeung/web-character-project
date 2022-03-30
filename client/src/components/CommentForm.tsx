import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineComment } from 'react-icons/ai';
import { DrawingCommentType, PostCommentType } from '@src/types';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { addDrawingComment } from '@src/store/requests/drawing.request';
// import { greenButtonStyle } from '@src/styles/GlobalStyles';

interface IProp {
  id: number;
  comments: DrawingCommentType[] | PostCommentType[];
  category: string;
}

function CommentForm({ id, comments, category }: IProp) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const [content, setContent] = useState('');

  const onAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (category === 'drawing') {
      await dispatch(addDrawingComment({ userId: user?.id!, drawingId: id, content }));
      setContent('');
      return;
    }
    return;
  };

  return (
    <Container>
      <div className="background">
        <textarea
          placeholder="댓글을 입력하세요.."
          cols={20}
          rows={3}
          wrap="hard"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="btn">
          <span>
            <AiOutlineComment />
            {/* {comments.length} */}
          </span>

          <button onClick={onAddComment}>등록</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .background {
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
      justify-content: space-between;
      padding: 0.5rem 0;
      span {
        font-size: 1.7rem;
      }
      button {
        padding: 0.5rem 1rem;
      }
    }
  }
`;

export default CommentForm;
