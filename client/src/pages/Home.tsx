import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardPreview from 'components/BoardPreview';
import { useAppDispatch } from 'store/app/hook';
import { getAllBoards } from 'store/requests/board.request';
import { PostType } from 'interfaces/index';

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
      <BoardPreview posts={free} board="free" />
      <BoardPreview posts={commission} board="commission" />
      <BoardPreview posts={reque} board="reque" />
      <BoardPreview posts={sale} board="sale" />
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
