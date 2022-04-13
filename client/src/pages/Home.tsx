import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardPreview from '@src/components/BoardPreview';
import { useAppDispatch } from '@src/store/app/hook';
import { getBoards } from '@src/store/requests/board.request';
import { Link } from 'react-router-dom';
import { PostType } from '@src/types';

function Home() {
  const dispatch = useAppDispatch();

  const [free, setFree] = useState<PostType[] | undefined>();
  const [drawingCommission, setDrawingCommission] = useState<PostType[] | undefined>();
  const [drawingRequest, setDrawingRequest] = useState<PostType[] | undefined>();
  const [drawingSale, setDrawingSale] = useState<PostType[] | undefined>();

  useEffect(() => {
    dispatch(getBoards())
      .unwrap()
      .then((res) => {
        const { free, drawingCommission, drawingRequest, drawingSale } = res;
        setFree(free);
        setDrawingCommission(drawingCommission);
        setDrawingRequest(drawingRequest);
        setDrawingSale(drawingSale);
      });
  }, []);

  return (
    <Container>
      <BoardPreview posts={free} board="free" />
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
