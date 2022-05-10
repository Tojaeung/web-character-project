import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardPreview from '@src/components/BoardPreview';
import { useAppDispatch } from '@src/store/app/hook';
import { getAllBoards } from '@src/store/requests/board.request';
import { PostType } from '@src/types';

function Home() {
  const dispatch = useAppDispatch();

  const [free, setFree] = useState<PostType[]>([]);
  const [commission, setCommission] = useState<PostType[]>([]);
  const [reque, setReque] = useState<PostType[]>([]);
  const [sale, setSale] = useState<PostType[]>([]);

  useEffect(() => {
    dispatch(getAllBoards())
      .unwrap()
      .then((res) => {
        const { free, commission, reque, sale } = res;
        setFree(free);
        setCommission(commission);
        setReque(reque);
        setSale(sale);
      });
  }, []);

  return (
    <Container>
      <BoardPreview posts={free} board="자유게시판" />
      <BoardPreview posts={commission} board="커미션" />
      <BoardPreview posts={reque} board="리퀘스트" />
      <BoardPreview posts={sale} board="분양" />
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
