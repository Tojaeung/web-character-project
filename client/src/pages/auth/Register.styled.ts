import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  .form {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    font-size: 3rem;
  }
  .input-wrapper {
    position: relative;
    width: 100%;
    margin: 2rem 0;
    align-self: flex-start;
  }
  .label {
    font-size: 1.5rem;
    align-self: flex-start;
  }
  .input {
    ${greenInputStyle};
  }
  .errorMessage {
    font-size: 1.3rem;
  }
  .icon {
    position: absolute;
    right: 1.5rem;
    top: 2.5rem;
    font-size: 2rem;
  }
  .guide {
    font-size: 1.3rem;
    text-align: center;
  }
  .submitBtn {
    ${greenButtonStyle}
    width: 100%;
    font-size: 2rem;
    padding: 1rem 0;
  }
`;
