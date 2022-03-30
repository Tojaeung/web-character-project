import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import CommentList from '@src/components/comment/CommentList';
import { DrawingCommentType, PostCommentType } from '@src/types';

interface IProp {
  comments: DrawingCommentType[] | PostCommentType[];
}

function Comment({ comments }: IProp) {
  // 댓글 더보기 기능
  const [visible, setVisible] = useState(10);
  const onCommentMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVisible((prevVisible) => prevVisible + 30);
  };

  // 선택된 댓글 인덱스
  const [selectedCommentIndex, setSelectedCommentIndex] = useState<number>();

  return (
    <Container>
      {comments!.slice(0, visible).map((comment, index) => (
        <CommentBox key={v4()}>
          <CommentList
            comment={comment}
            index={index}
            setSelectedCommentIndex={setSelectedCommentIndex}
            isSelected={selectedCommentIndex === index ? true : false}
          />
        </CommentBox>
      ))}
      {(comments!.length as number) < visible ? null : <MoreButton onClick={onCommentMore}>댓글 더보기</MoreButton>}
    </Container>
  );
}

const Container = styled.ul`
  overflow-y: scroll;
  height: calc(100vh - 32rem);
  padding-bottom: 0.5rem;
`;
const CommentBox = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.palette.black};
  margin-bottom: 0.5rem;
`;
const MoreButton = styled.button`
  width: 100%;
  outline: none;
  border: 0;
  cursor: pointer;
  padding: 0.5rem 0;
  &:hover {
    text-decoration: underline;
  }
`;

export default Comment;
