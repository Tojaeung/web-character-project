import styled from 'styled-components';
import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
  u {
    text-decoration: underline;
  }
  s {
    text-decoration: line-through;
  }
  .wrapper {
    width: 70rem;
    display: flex;
    flex-direction: column;
  }
  .ql-editor {
    width: 100%;
    min-height: 10rem;
    font-size: 1.5rem;
  }
  .btn-wrapper {
    align-self: flex-end;
    padding: 1rem 2rem;
  }
  .submit-btn {
    ${greenButtonStyle};
    padding: 1rem 2rem;
  }
  .cancel-btn {
    margin-left: 1rem;
    ${redButtonStyle};
    padding: 1rem 2rem;
  }
`;
