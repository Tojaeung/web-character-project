import { useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import CommentList from '@src/components/comment/CommentList';
import { DrawingCommentType, PostCommentType } from '@src/types';
import Pagination from './Pagination';

interface IProp {
  comments: DrawingCommentType[] | PostCommentType[];
  type: 'drawing' | 'board';
}

function Comment({ comments, type }: IProp) {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 20;

  // 댓글 수정하기 위한 선택된 댓글 인덱스
  const [commentIndex, setCommentIndex] = useState<number>();

  return (
    <>
      {!comments ? null : (
        <Container>
          {comments!.slice(offset, offset + 20).map((comment, index) => (
            <CommentList
              key={v4()}
              type={type}
              comment={comment}
              index={index}
              setCommentIndex={setCommentIndex}
              isSelected={commentIndex === index ? true : false}
            />
          ))}
          <Pagination total={comments!.length} page={page} setPage={setPage} />
        </Container>
      )}
    </>
  );
}

const Container = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Comment;
