import styled from 'styled-components';
import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 50rem;
  max-height: 30rem;
  border-radius: 10px;
  padding: 2rem;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: ${({ theme }) => theme.palette.white};

  .closeBtn {
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
    align-self: flex-end;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
  }
  .title {
    font-size: 3rem;
    font-weight: 700;
    align-self: flex-start;
  }
  .desc {
    padding: 2rem;
    font-size: 1.5rem;
    align-self: flex-start;
  }
  .modifyBtn {
    ${greenButtonStyle};
    font-size: 1.5rem;
    padding: 1rem 2rem;
    margin-right: 1rem;
  }
  .cancelBtn {
    ${redButtonStyle};
    font-size: 1.5rem;
    padding: 1rem 2rem;
  }
`;
