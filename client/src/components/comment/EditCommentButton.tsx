import React from 'react';
import styled from 'styled-components';

interface IProp {
  id: number;
}

function EditCommentButton({ id }: IProp) {
  return <StyledButton>수정</StyledButton>;
}

const StyledButton = styled.button`
  color: ${({ theme }) => theme.palette.white};
`;

export default EditCommentButton;
