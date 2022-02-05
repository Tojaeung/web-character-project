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
`;
export const Message = styled.div<{ kinds: string }>`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ kinds }) => (kinds === 'sent' ? 'flex-end' : 'flex-start')};
  background-color: ${({ kinds }) => (kinds === 'sent' ? 'red' : 'blue')};
  border-radius: 10px;
  margin-bottom: 1rem;
`;

export const Header = styled.div<{ kinds: string }>`
  width: 100%;
  display: flex;
  padding: 0.3rem;
  align-items: center;
  justify-content: ${({ kinds }) => (kinds === 'sent' ? 'flex-end' : 'flex-start')};

  > div.time {
    margin-right: ${({ kinds }) => (kinds === 'sent' ? '0.5rem' : '0rem')};
  }

  > div.from {
    font-size: 1.2rem;
    font-weight: 700;
    margin-right: ${({ kinds }) => (kinds === 'sent' ? '0rem' : '0.5rem')};
  }
`;

export const Body = styled.div<{ kinds: string }>`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: ${({ kinds }) => (kinds === 'sent' ? 'flex-end' : 'flex-start')};

  > div {
    font-size: 1.2rem;
  }

  > img {
    width: 50%;
  }
`;
