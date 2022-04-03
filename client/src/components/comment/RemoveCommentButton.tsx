import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@src/store/app/hook';
import { removeDrawingComment } from '@src/store/requests/drawing.request';

interface IProp {
  id: number;
}

function RemoveCommentButton({ id }: IProp) {
  const dispatch = useAppDispatch();

  const onRemoveComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(removeDrawingComment({ drawingCommentId: id }));
  };

  return <StyledButton onClick={onRemoveComment}>삭제</StyledButton>;
}

const StyledButton = styled.button`
  text-decoration: none;
  background-color: red;
  color: ${({ theme }) => theme.palette.white};
`;

export default RemoveCommentButton;
