import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { getBoard } from '@src/store/requests/board.request';
import { selectBoardSelectedBoard } from '@src/store/slices/board.slice';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import Nickname from '@src/components/Nickname';
import Pagination from './Pagination';
import boardTitle from '@src/utils/boardTitle.util';
import LimitSelector from './LimitSelector';
import CreatedTime from '@src/components/CreatedTime';

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
    <>
      <Container>
        <Header>
          <BoardName>{boardTitle(board as string)}</BoardName>
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
                  <Id>{post.id}</Id>
                  <Title>
                    <Link to={`/board/${board}/post/${post.id}`}>{post.title}</Link>
                  </Title>
                  <Name>
                    <Nickname exp={post.user.exp} nickname={post.user.nickname} size="small" />
                  </Name>
                  <Views>{post.views}</Views>
                  <Date>
                    <CreatedTime createdTime={post.created_at} size="small" />
                  </Date>
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Pagination total={totalPostsNum} page={page} setPage={setPage} limit={Number(limit)} />
      </Container>
      <Responsive>
        <Header>
          <BoardName>{boardTitle(board as string)}</BoardName>
          <LimitSelector setPage={setPage} limit={limit} setLimit={setLimit} />
        </Header>
        <Table>
          <Thead>
            <Tr>
              <Th>제목</Th>
            </Tr>
          </Thead>
          <Tbody>
            {selectedBoard &&
              selectedBoard.map((post) => (
                <Tr key={v4()}>
                  <Title>
                    <Link to={`/board/${board}/post/${post.id}`}>{post.title}</Link>
                    <BottomBox>
                      <Nickname exp={post.user.exp} nickname={post.user.nickname} size="small" />
                      <Views>조회수: {post.views}</Views>
                      <CreatedTime createdTime={post.created_at} size="small" />
                    </BottomBox>
                  </Title>
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Pagination total={totalPostsNum} page={page} setPage={setPage} limit={Number(limit)} />
      </Responsive>
    </>
  );
}
const Id = styled.td`
  border-right: 1px solid ${({ theme }) => theme.palette.gray};
`;
const Title = styled.td`
  width: 60%;
  text-align: left;
  padding: 1rem 2rem;

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;
const BottomBox = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
const Name = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Views = styled.td``;
const Date = styled.td``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.bgColor};
  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.palette.gray};
`;

const Thead = styled.thead``;

const Th = styled.th`
  padding: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.palette.black};
  background-color: ${({ theme }) => theme.palette.gray};
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  text-align: center;
  font-size: 1.2rem;
  flex-wrap: wrap;
  word-break: break-all;
  border: 1px solid ${({ theme }) => theme.palette.gray};
`;

const Header = styled.div`
  width: 100%;
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;
const BoardName = styled.h1``;

const Responsive = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.palette.bgColor};
  }
`;

export default Board;
