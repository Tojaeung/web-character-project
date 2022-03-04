import styled from 'styled-components';
import { redButtonStyle, greenButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 999;

  .cover-wrapper {
    width: 70rem;
    height: 30rem;
    border-radius: 10px;
    overflow: hidden;
  }
  .cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .avatar-wrapper {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 20rem;
    border: 3px solid ${({ theme }) => theme.palette.gray1};
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .info-wrapper {
    padding-top: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .row1 {
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .level {
    font-size: 2.5rem;
    margin-right: 1rem;
  }
  .nickname {
    font-weight: 700;
  }

  .row2 {
    padding: 1rem 0rem;
  }
  .desc {
    font-size: 1.5rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .row3 {
    font-size: 1.3rem;
    display: flex;
    font-weight: 500;
  }
  .follower {
    margin-right: 2rem;
  }
  .row4 {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
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

  .followBtn-wrapper {
    margin-right: 1rem;
  }
  .follow-btn {
    ${greenButtonStyle};
    padding: 1rem;
  }
  .unFollow-btn {
    ${redButtonStyle};
    padding: 1rem;
  }
  .addPhoto-btn {
    ${greenButtonStyle};
    padding: 1rem;
  }
`;
