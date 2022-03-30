import React from 'react';
import styled from 'styled-components';
import EditCommentForm from '@src/components/comment/EditCommentForm';

interface IProp {
  id: number;
}

function EditCommentBtn({ id }: IProp) {
  return <StyledButton>수정</StyledButton>;
}

const StyledButton = styled.button`
  color: ${({ theme }) => theme.palette.white};
`;

export default EditCommentBtn;
