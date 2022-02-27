import styled from 'styled-components';
import { redButtonStyle, greenButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 100%;

  .list-wrapper {
    width: 70rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid;
    padding: 2rem;
  }

  .title {
    font-size: 2rem;
  }
  .email-subTitle {
    color: ${({ theme }) => theme.palette.red};
    font-size: 1.5rem;
  }

  .defaultBtn {
    ${redButtonStyle};
    padding: 1rem 2rem;
    margin-right: 2rem;
  }
  .btn {
    ${greenButtonStyle};
    padding: 1rem 2rem;
  }
  .delAccount-btn {
    ${redButtonStyle};
  }

  .avatar-wrapper {
    position: relative;
    width: 20rem;
    height: 20rem;
    overflow: hidden;
    margin-top: 2rem;
    border-radius: 5px;
    border: 3px dotted ${({ theme }) => theme.palette.gray6};
  }
  .background {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30rem;
    height: 30rem;
    background-color: ${({ theme }) => theme.palette.gray1};
    opacity: 0.5;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .default-btn {
    z-index: 1001;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.3rem;
    padding: 1rem;
    ${redButtonStyle};
  }
  .edit-btn {
    z-index: 1001;
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.3rem;
    padding: 1rem;
    ${greenButtonStyle};
  }
  .input {
    display: none;
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
