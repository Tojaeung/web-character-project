import styled from 'styled-components';
import { v4 } from 'uuid';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CreatedTime from '@src/components/CreatedTime';
import Nickname from './Nickname';
import { PostType } from '@src/types';
import boardTitle from '@src/utils/boardTitle.util';

interface IProps {
  posts: PostType[] | null;
  board: 'free' | 'drawingCommission' | 'drawingRequest' | 'drawingSale';
}

function BoardPreview({ posts, board }: IProps) {
  return (
    <Table>
      <Thaed>
        <Tr>
          <Th>
            {boardTitle(board)}
            <Link to={`/board/${board}`}>
              <ChevronRightIcon />
            </Link>
          </Th>
        </Tr>
      </Thaed>
      <Tbody>
        {posts &&
          posts.map((post) => (
            <Tr key={v4()}>
              <Td>
                <PostTitle>{post.title}</PostTitle>
                <PostUser>
                  <Nickname exp={post.user.exp} nickname={post.user.nickname} size="small" />
                  <CreatedTime createdTime={post.created_at} size="small" />
                </PostUser>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.palette.white};
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
`;
const Thaed = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.palette.black};
`;
const Th = styled.th`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: bold;
`;
const Tbody = styled.tbody``;
const Tr = styled.tr``;

const Td = styled.td`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
  @media ${({ theme }) => theme.device.mobile} {
    flex-wrap: wrap;
  }
`;
const ChevronRightIcon = styled(FiChevronRight)`
  font-size: 2.5rem;
`;
const PostTitle = styled.p`
  padding: 0.5rem;
  word-break: break-all;
  font-size: 1.2rem;
`;
const PostUser = styled.span`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default BoardPreview;
