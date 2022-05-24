import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { inverseRedButtonStyle } from 'styles/button.style';
import CreatedTime from 'components/CreatedTime';
import { useAppDispatch } from 'store/app/hook';
import { getAllMyPosts } from 'store/requests/board.request';
import { deletePost } from 'store/requests/post.request';
import { PostType } from 'interfaces/index';
import TabMenu from './common/TabMenu';
import Pagination from './common/Pagination';

function MyPosts() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const [allMyPosts, setAllMyPosts] = useState<PostType[]>([]);
  const [totalPostsNum, setTotalPostsNum] = useState(0);

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  useEffect(() => {
    dispatch(getAllMyPosts({ page }))
      .unwrap()
      .then((res) => {
        const { allMyPosts, totalPostsNum } = res;
        setAllMyPosts(allMyPosts);
        setTotalPostsNum(totalPostsNum);
      });
  }, [dispatch, page]);

  const handleDelete = (postId: number) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(deletePost({ postId }))
      .unwrap()
      .then((res) => {
        const { message } = res;
        alert(message);
      });
    setAllMyPosts(allMyPosts.filter((post) => post.id !== postId));
  };

  return (
    <Container>
      <TabMenu />
      <table>
        <thead>
          <tr>
            <th>게시판</th>
            <th>제목</th>
            <th>작성일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {!allMyPosts.length ? (
            <tr>
              <td colSpan={4}>정보가 없습니다...</td>
            </tr>
          ) : (
            allMyPosts.map((post: PostType) => (
              <tr key={v4()}>
                <td className="board-name">{post.board?.krName}</td>
                <td className="title">
                  <PostLink to={`/${post.board?.enName}/${post.id}`}>{post.title}</PostLink>
                </td>
                <td>
                  <CreatedTime createdTime={post.created_at} fontSize={1.2} />
                </td>
                <td>
                  <DeleteButton onClick={handleDelete(post.id)}>삭제</DeleteButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination total={totalPostsNum} page={page} setPage={setPage} />
    </Container>
  );
}

const Container = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  table {
    width: 100%;
  }
  th {
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: ${({ theme }) => theme.palette.gray};
    border: 1px solid ${({ theme }) => theme.palette.black};
    white-space: nowrap;
    media ${({ theme }) => theme.device.mobile} {
      font-size: 1.3rem;
    }
  }

  td {
    text-align: center;
    font-size: 1.3rem;
    background-color: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.gray};
    padding: 0.5rem;
    media ${({ theme }) => theme.device.mobile} {
      font-size: 1.2rem;
    }
  }

  .board-name {
    white-space: nowrap;
  }
  .title {
    text-align: left;
    width: 60%;
    word-break: break-all;
  }
`;
const PostLink = styled(Link)``;
const DeleteButton = styled.button`
  ${inverseRedButtonStyle};
`;

export default MyPosts;
