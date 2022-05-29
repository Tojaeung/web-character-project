import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllMyComments } from 'store/requests/board.request';
import { Link, useSearchParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { inverseRedButtonStyle } from 'styles/button.style';
import CreatedTime from 'components/CreatedTime';
import { useAppDispatch } from 'store/app/hook';
import { deletePostComment } from 'store/requests/post.request';
import { PostCommentType } from 'interfaces/index';
import TabMenu from './common/TabMenu';
import Pagination from './common/Pagination';

function MyComments() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const [allMyComments, setAllMyComments] = useState<PostCommentType[]>([]);
  const [totalCommentsNum, setTotalCommentsNum] = useState(0);

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  useEffect(() => {
    dispatch(getAllMyComments({ page }))
      .unwrap()
      .then((res) => {
        const { allMyComments, totalCommentsNum } = res;
        setAllMyComments(allMyComments);
        setTotalCommentsNum(totalCommentsNum);
      });
  }, [dispatch, page]);

  const handleDelete = (commentId: number) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(deletePostComment({ commentId }))
      .unwrap()
      .then((res) => {
        const { message } = res;
        alert(message);
      });
    setAllMyComments(allMyComments.filter((comment) => comment.id !== commentId));
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
          {!allMyComments.length ? (
            <tr>
              <td colSpan={4}>정보가 없습니다...</td>
            </tr>
          ) : (
            allMyComments.map((comment: PostCommentType) => (
              <tr key={v4()}>
                <td className="board-name">{comment.board?.krName}</td>
                <td className="title">
                  <PostLink to={`/${comment.board?.enName}/${comment.post_id}`}>{comment.content}</PostLink>
                </td>
                <td>
                  <CreatedTime createdTime={comment.created_at} fontSize={1.2} />
                </td>
                <td>
                  <DeleteButton onClick={handleDelete(comment.id)}>삭제</DeleteButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination total={totalCommentsNum} page={page} setPage={setPage} />
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
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 1.3rem;
    }
  }

  td {
    text-align: center;
    font-size: 1.3rem;
    background-color: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.gray};
    padding: 0.5rem;
    @media ${({ theme }) => theme.device.mobile} {
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

export default MyComments;
