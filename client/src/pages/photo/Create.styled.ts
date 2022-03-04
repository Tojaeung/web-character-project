import styled from 'styled-components';
import { greenButtonStyle, redButtonStyle, defaultInputStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  .form {
    width: 80rem;
    padding: 2rem;
    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  .title {
    align-self: flex-start;
    font-size: 2rem;
    padding-bottom: 2rem;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .photo-wrapper {
    width: 70rem;
    margin-right: 2rem;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.palette.white};
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray1};
    }
  }
  .photo-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .photo-input {
    display: none;
  }
  .add-icon {
    font-size: 5rem;
    margin-bottom: 1rem;
  }
  .photo-guide {
    font-size: 1.5rem;
  }

  .user-wrapper {
    display: flex;
    align-items: center;
    padding: 1rem 0rem;
  }
  .avatar-wrapper {
    width: 5rem;
    height: 5rem;
    overflow: hidden;
    border-radius: 50%;
    border: 3px solid ${({ theme }) => theme.palette.gray2};
    margin-right: 1rem;
    margin-left: 1rem;
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .level {
    font-size: 2rem;
    margin-right: 1rem;
  }
  .nickname {
    font-size: 2rem;
    font-weight: 700;
  }
  .info-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    overflow-y: auto;
  }
  .input-wrapper {
    align-self: center;
    width: 93%;
    padding-bottom: 1rem;
  }
  .input {
    ${defaultInputStyle};
    padding: 0 1rem;
  }
  .ql-editor {
    width: 100%;
  }
  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .submit-btn {
    ${greenButtonStyle};
    padding: 1rem 2rem;
    margin-right: 1rem;
  }
  .cancel-btn {
    ${redButtonStyle};
    padding: 1rem 2rem;
    margin-right: 1.5rem;
  }

  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
  u {
    text-decoration: underline;
  }
  s {
    text-decoration: line-through;
  }

  .tags-wrapper {
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 93%;
    align-self: center;
    border: 2px solid ${({ theme }) => theme.palette.gray2};
  }
  .tag-item {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.palette.gray1};
    padding: 0.5rem 0.75rem;
    border-radius: 20px;
  }
  .tag-item .close {
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.palette.white};
    background-color: ${({ theme }) => theme.palette.black};
    border-radius: 50%;
    margin-left: 0.2rem;
  }
  .tags-input {
    flex-grow: 1;
    border: none;
    outline: none;
  }
`;
