import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { getBoard } from '@src/store/requests/board.request';
import { selectBoardSelectedBoard } from '@src/store/slices/board.slice';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import Nickname from '@src/components/Nickname';
import relativeTime from '@src/utils/date.util';
import Pagination from './Pagination';
import boardTitle from '@src/utils/boardTitle.util';
import LimitSelector from './LimitSelector';

function Board() {
  const dispatch = useAppDispatch();
  const { board } = useParams();

  const selectedBoard = useAppSelector(selectBoardSelectedBoard);

  const [totalPostsNum, setTotalPostsNum] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);

  // 게시글 데이터 가져오기
  useEffect(() => {
    dispatch(
      getBoard({
        board: board as string,
        page,
        limit,
      })
    )
      .unwrap()
      .then((res) => setTotalPostsNum(res.totalPostsNum));
  }, [page, limit]);

  return (
    <Container>
      <Header>
        <Title>{boardTitle(board as string)}</Title>
        <LimitSelector setPage={setPage} limit={limit} setLimit={setLimit} />
      </Header>
      <Table>
        <Thead>
          <Tr>
            <Th>번호</Th>
            <Th>제목</Th>
            <Th>닉네임</Th>
            <Th>조회수</Th>
            <Th>날짜</Th>
          </Tr>
        </Thead>
        <Tbody>
          {selectedBoard &&
            selectedBoard.map((post) => (
              <Tr key={v4()}>
                <Td>{post.id}</Td>
                <Td>
                  <Link to={`/board/${board}/post/${post.id}`}>{post.title}</Link>
                </Td>
                <Td>
                  <Nickname exp={post.user.exp} nickname={post.user.nickname} size="small" />
                </Td>
                <Td>{post.views}</Td>
                <Td>{relativeTime(post.created_at)}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Pagination total={totalPostsNum} page={page} setPage={setPage} limit={Number(limit)} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  border: 1px solid;
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.palette.white};
  margin: 0 auto;
`;

const Thead = styled.thead`
  padding: 1rem;
  font-size: 1.8rem;
`;
const Th = styled.th`
  padding: 1rem;
  font-size: 1.8rem;
`;

const Tbody = styled.tbody`
  font-size: 1.5rem;
`;
const Td = styled.td`
  border: 0;
  padding: 1rem;
  text-align: center;
`;

const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.palette.gray};
  }
`;

const Header = styled.div`
  width: 100%;
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;
const Title = styled.h1``;

export default Board;
