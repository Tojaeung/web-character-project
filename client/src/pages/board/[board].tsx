import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { useGetBoard } from '@src/hook/useInitPage';
import { selectBoardSelectedBoard } from '@src/store/slices/board.slice';
import { useAppSelector } from '@src/store/app/hook';
import relativeTime from '@src/utils/date.util';
import getLevel from '@src/utils/exp.util';

function Board() {
  const { board } = useParams();
  useGetBoard(board as string);
  const selectedBoard = useAppSelector(selectBoardSelectedBoard);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>번호</Th>
          <Th>제목</Th>
          <Th>닉네임</Th>
          <Th>조회수</Th>
          <Th>좋아요</Th>
          <Th>싫어요</Th>
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
                [Lv.{getLevel(post.user.exp)}] {post.user.nickname}
              </Td>
              <Td>{post.views}</Td>
              <Td>{post.likes.length}</Td>
              <Td>{post.dislikes.length}</Td>
              <Td>{relativeTime(post.created_at)}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}

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
`;

const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.palette.gray};
  }
`;

export default Board;
