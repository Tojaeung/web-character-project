import styled from 'styled-components';
import { greenInputStyle, greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 40rem;
  height: 25rem;
  border-radius: 10px;
  padding: 2rem;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: ${({ theme }) => theme.palette.white};
  /* display: flex;
    justify-content: center;
    flex-direction: column; */
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: 2rem;
    align-self: flex-start;
  }
  .content {
    text-align: center;
    font-size: 1.2rem;
    line-height: 2rem;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }
  .input {
    ${greenInputStyle};
  }

  .errorMessage {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.palette.red};
    align-self: flex-start;
    position: absolute;
    top: 4rem;
  }
  .closeBtn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
    align-self: flex-end;
  }
  .content {
    font-size: 1.5rem;
    padding: 2rem 0;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 2rem;
  }
  .submitBtn {
    font-size: 1.5rem;
    padding: 1rem;
    ${greenButtonStyle};
    margin-right: 1rem;
  }
  .cancelBtn {
    font-size: 1.5rem;
    padding: 1rem;
    cursor: pointer;
    ${redButtonStyle};
  }
`;
