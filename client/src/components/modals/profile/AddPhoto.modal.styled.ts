import styled from 'styled-components';
import { greenInputStyle, greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 50rem;
  height: 70rem;
  border-radius: 10px;
  padding: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: ${({ theme }) => theme.palette.white};
  overflow-y: auto;
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .closeBtn {
    align-self: flex-end;
    font-size: 2rem;
    cursor: pointer;
  }

  .title {
    font-size: 2.5rem;
    align-self: flex-start;
    padding-bottom: 2rem;
  }

  .input-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 94%;
    padding-bottom: 1rem;
  }

  .input {
    ${greenInputStyle};
    padding: 0rem 1rem;
  }

  .ql-editor {
    width: 100%;
    font-size: 1.5rem;
    min-height: 20rem;
  }

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
  .addPhoto-wrapper {
    align-self: flex-start;
  }
  .addPhoto-btn {
    ${greenButtonStyle};
    padding: 1rem;
    align-self: flex-start;
    margin-left: 1.5rem;
  }

  .photo-input {
    display: none;
  }

  .btn-wrapper {
    align-self: flex-end;
  }
  .submitBtn {
    ${greenButtonStyle};
    padding: 1rem 2rem;
    margin-right: 1rem;
  }
  .cancelBtn {
    ${redButtonStyle};
    padding: 1rem 2rem;
  }
`;
