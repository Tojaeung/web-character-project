import styled from 'styled-components';
import { greenInputStyle, greenButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 70rem;
  border-bottom: 1px solid;
  padding: 2rem;

  .title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .form {
    display: flex;
    align-items: flex-start;
  }
  .input {
    ${greenInputStyle};
    width: 30rem;
    margin-right: 2rem;
  }
  .errorMessage {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.palette.red};
  }

  .btn {
    ${greenButtonStyle};
    padding: 1rem 2rem;
  }
`;
