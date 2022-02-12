import styled from 'styled-components';
import { greenButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 40rem;
  height: 25rem;
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
  align-items: center;
  flex-direction: column;

  .closeBtn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
  }
  .icon {
    font-size: 8rem;
    color: ${({ theme }) => theme.palette.green};
  }
  .content {
    font-size: 1.5rem;
    padding: 2rem 0;
  }
  .content-text {
    font-weight: 700;
  }

  .confirmBtn {
    width: 50%;
    font-size: 1.5rem;
    padding: 1rem;
    cursor: pointer;

    ${greenButtonStyle};
  }
`;
