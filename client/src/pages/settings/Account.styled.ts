import styled from 'styled-components';
import { greenButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 100%;
  display: flex;

  .infoWrapper {
  }

  .title {
    font-size: 2rem;
  }
  .delete {
    width: 70rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid;
    padding: 2rem;
  }
  .btn {
    ${greenButtonStyle};
    padding: 1rem 2rem;
  }

  .delete-subtitle {
    width: 40rem;
    font-size: 1.2rem;
    background-color: ${({ theme }) => theme.palette.yellow1};
    color: ${({ theme }) => theme.palette.red};
    border-radius: 10px;
    padding: 1rem;
  }

  .avatar {
    width: 70rem;
    padding: 2rem;
  }
  .avatar-wrapper {
    width: 30rem;
    height: 30rem;
    overflow: hidden;
    margin-top: 2rem;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
