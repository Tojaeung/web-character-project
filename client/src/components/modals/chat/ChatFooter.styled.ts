import styled from 'styled-components';
import { greenInputStyle, greenButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem 0 1rem;
`;

export const imgWrapper = styled.div`
  > input {
    display: none;
  }

  .imgIcon {
    font-size: 3rem;
    cursor: pointer;
  
  }
`;

export const textWrapper = styled.div`
  display: flex;
  width: 100%;
  > input {
    ${greenInputStyle};
    margin: 0rem 1rem;
  }

  > button {
    ${greenButtonStyle};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6rem;
  }

  .textIcon {
    font-size: 2.5rem;
  }
`;
