import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  .form {
    width: 320px;
    height: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.palette.white};
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 10px;
  }
  .closeBtn {
    font-size: 2.5rem;
    align-self: flex-end;
    cursor: pointer;
  }
  .title {
    font-size: 3rem;
    margin: 2rem 0;
  }
  .input-wrapper {
    width: 100%;
    margin-bottom: 1rem;
    position: relative;
  }

  .input {
    ${greenInputStyle};
  }
  .icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
  }
  .submitBtn {
    width: 100%;
    ${greenButtonStyle};
    padding: 1rem;
    font-size: 1.5rem;
  }
  .btn-wrapper {
    text-align: center;
    margin: 1rem 0;
  }
  .findPassword-btn {
    font-size: 1.3rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .boundary {
    font-size: 1.3rem;
  }
  .register-btn {
    font-size: 1.3rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
