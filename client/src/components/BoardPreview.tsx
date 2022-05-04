import styled from 'styled-components';
import { v4 } from 'uuid';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CreatedTime from '@src/components/CreatedTime';
import Nickname from './Nickname';
import { PostType } from '@src/types';
import boardName from '@src/utils/boardName.util';

interface IProps {
  posts: PostType[];
  board: 'free' | 'commission' | 'reque' | 'sale';
}

function BoardPreview({ posts, board }: IProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>
            {boardName(board)}
            <Link to={`/board/${board}`}>
              <ChevronRightIcon />
            </Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {posts &&
          posts.map((post) => (
            <tr key={v4()}>
              <td>
                <PostTitle to={`/board/${board}/post/${post.id}`}>{post.title}</PostTitle>
                <PostUser>
                  <Nickname exp={post.user?.exp!} nickname={post.user?.nickname!} fontSize={1.3} />
                  <CreatedTime createdTime={post.created_at} fontSize={1.2} />
                </PostUser>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.palette.white};
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  thead {
    border-bottom: 1px solid ${({ theme }) => theme.palette.black};
    th {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      font-size: 1.8rem;
      font-weight: bold;
    }
  }
  tbody {
    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
      @media ${({ theme }) => theme.device.mobile} {
        flex-wrap: wrap;
      }
    }
  }
`;

const ChevronRightIcon = styled(FiChevronRight)`
  font-size: 2.5rem;
`;
const PostTitle = styled(Link)`
  padding: 0.5rem;
  word-break: break-all;
  font-size: 1.2rem;
  &:hover {
    text-decoration: underline;
  }
`;
const PostUser = styled.span`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default BoardPreview;
