import styled from 'styled-components';
import { redButtonStyle, greenButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 100%;
  display: flex;

  .infoWrapper {
  }

  .delAccount {
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
  .btn {
    ${greenButtonStyle};
    padding: 1rem 2rem;
  }

  .avatar {
    width: 70rem;
    padding: 2rem;
  }
  .avatar-wrapper {
    position: relative;
    width: 30rem;
    height: 30rem;
    overflow: hidden;
    margin-top: 2rem;
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

  .default {
    z-index: 1001;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    padding: 1rem;
    ${redButtonStyle};
  }
  .edit {
    z-index: 1001;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    padding: 1rem;
    ${greenButtonStyle};
  }
  .edit-input {
    display: none;
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
