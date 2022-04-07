import styled from 'styled-components';
import { useGetBoards } from '@src/hook/useInitPage';
import BoardPreview from '@src/components/BoardPreview';
import { useAppSelector } from '@src/store/app/hook';
import { Link } from 'react-router-dom';

import {
  selectBoardFree,
  selectBoardDrawingCommission,
  selectBoardDrawingRequest,
  selectBoardDrawingSale,
} from '@src/store/slices/board.slice';

function Home() {
  useGetBoards();
  const drawingFree = useAppSelector(selectBoardFree);
  const drawingCommission = useAppSelector(selectBoardDrawingCommission);
  const drawingRequest = useAppSelector(selectBoardDrawingRequest);
  const drawingSale = useAppSelector(selectBoardDrawingSale);

  return (
    <Container>
      <BoardPreview posts={drawingFree} board="free" />
      <BoardPreview posts={drawingCommission} board="drawingCommission" />
      <BoardPreview posts={drawingRequest} board="drawingRequest" />
      <BoardPreview posts={drawingSale} board="drawingSale" />

      <Link to="/create/postForm/drawingCommission">
        <h1>커미션폼</h1>
      </Link>
      <Link to="/create/postForm/drawingRequest">
        <h1>리퀘폼</h1>
      </Link>
      <Link to="/create/postForm/drawingSale">
        <h1>분양폼</h1>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media ${({ theme }) => theme.device.tablet} {
    grid-template-columns: 1fr;
  }
`;

export default Home;
