import styled from 'styled-components';
import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 32rem;
  height: 15rem;
  border-radius: 10px;
  padding: 1rem;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: ${({ theme }) => theme.palette.white};
  display: flex;
  justify-content: center;
  flex-direction: column;

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
    justify-content: flex-end;
  }
  .confirmBtn {
    font-size: 1.2rem;
    padding: 1rem;
    cursor: pointer;
    align-self: flex-end;
    ${greenButtonStyle};
    margin-right: 1rem;
  }
  .cancelBtn {
    font-size: 1.2rem;
    padding: 1rem;
    cursor: pointer;
    align-self: flex-end;

    ${redButtonStyle};
  }
`;
