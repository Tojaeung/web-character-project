import styled from 'styled-components';
import { redButtonStyle, greenButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  display: flex;
  padding: 2rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.palette.gray1};
  .avatar-wrapper {
    width: 25rem;
    height: 25rem;
    overflow: hidden;
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .info-wrapper {
    padding: 2rem;
  }
  .row1 {
    font-size: 3rem;
    display: flex;
    align-items: center;
  }
  .level {
    font-size: 2.5rem;
    margin-right: 1rem;
  }
  .nickname {
    margin-right: 3rem;
  }

  .follow-wrapper {
    padding: 2rem 2rem;
    font-size: 1.8rem;
    display: flex;
  }
  .follower {
    margin-right: 5rem;
  }
  .btn-wrapper {
    display: flex;
  }
  .chatBtn-wrapper {
    margin-right: 1rem;
  }
  .startChat-btn {
    ${greenButtonStyle};
    padding: 1rem;
  }
  .chatting-btn {
    ${redButtonStyle};
    padding: 1rem;
  }

  .follow-btn {
    ${greenButtonStyle};
    padding: 1rem;
  }
  .unFollow-btn {
    ${redButtonStyle};
    padding: 1rem;
  }
  .desc-wrapper {
  }
  .desc-title {
    font-size: 2rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
  }
  .desc-icon {
    margin-left: 0.5rem;
    cursor: pointer;
  }
  .desc {
    font-size: 1.5rem;
  }
  .desc-btn {
    ${greenButtonStyle};
    padding: 1rem;
  }
`;
