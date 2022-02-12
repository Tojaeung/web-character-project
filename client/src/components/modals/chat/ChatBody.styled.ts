import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 1rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.gray3};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.palette.gray5};
  }

  .sent-wrapper {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    background-color: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.gray3};
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .received-wrapper {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.gray3};
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .sent-header {
    width: 100%;
    display: flex;
    padding: 0.3rem;
    align-items: center;
    justify-content: flex-end;
  }

  .received-header {
    width: 100%;
    display: flex;
    padding: 0.3rem;
    align-items: center;
    justify-content: flex-start;
  }
  .sent-time {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.palette.gray5};
  }
  .sent-from {
    font-size: 1.2rem;
    font-weight: 700;
  }
  .received-from {
    margin-right: 0.5rem;
    font-size: 1.2rem;
    font-weight: 700;
  }
  .received-time {
    color: ${({ theme }) => theme.palette.gray5};
  }

  .sent-body {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }
  .received-body {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: flex-start;
  }
  .textMessage {
    font-size: 1.2rem;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .imgMessage {
    width: 50%;
  }
`;
