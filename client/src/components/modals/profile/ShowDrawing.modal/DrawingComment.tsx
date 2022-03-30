import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { useAppSelector } from '@src/store/app/hook';
import { selectDrawingDrawings, selectDrawingIndex } from '@src/store/slices/drawing.slice';
import Comment from '@src/components/common/Comment';

function DrawingComment() {
  const drawings = useAppSelector(selectDrawingDrawings);
  const selectedIndex = useAppSelector(selectDrawingIndex);

  // 댓글 더보기 기능
  const [visible, setVisible] = useState(10);
  const onCommentMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVisible((prevVisible) => prevVisible + 30);
  };

  const [selectedCommentIndex, setSelectedCommentIndex] = useState<number>();

  return (
    <Container>
      <ul>
        {drawings[selectedIndex!]?.drawingComments!.slice(0, visible).map((drawingComment, index) => (
          <li key={v4()}>
            <Comment
              comment={drawingComment}
              index={index}
              setSelectedCommentIndex={setSelectedCommentIndex}
              isSelected={selectedCommentIndex === index ? true : false}
            />
          </li>
        ))}
        {(drawings[selectedIndex!]?.drawingComments!.length as number) < visible ? null : (
          <button onClick={onCommentMore}>댓글 더보기</button>
        )}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  ul {
    overflow-y: scroll;
    height: calc(100vh - 32rem);
    padding-bottom: 0.5rem;
    li {
      border-bottom: 1px solid ${({ theme }) => theme.palette.black};
      margin-bottom: 0.5rem;
    }
    button {
      width: 100%;
      outline: none;
      border: 0;
      cursor: pointer;
      padding: 0.5rem 0;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default DrawingComment;
