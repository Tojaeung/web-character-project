import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllMyComments } from '@src/store/requests/board.request';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { inverseRedButtonStyle } from '@src/styles/button.style';
import CreatedTime from '@src/components/CreatedTime';
import { useAppDispatch } from '@src/store/app/hook';
import { deletePostComment } from '@src/store/requests/post.request';
import { PostCommentType } from '@src/types';
import TabMenu from './common/TabMenu';

function MyComments() {
  const dispatch = useAppDispatch();

  const [allMyComments, setAllMyComments] = useState<PostCommentType[]>([]);

  useEffect(() => {
    dispatch(getAllMyComments())
      .unwrap()
      .then((res) => {
        const { allMyComments } = res;
        setAllMyComments(allMyComments);
      });
  }, []);

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
                  <CreatedTime createdTime={comment.created_at} fontSize={1.3} />
                </td>
                <td>
                  <DeleteButton onClick={handleDelete(comment.id)}>삭제</DeleteButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Container>
  );
}

const Container = styled.table`
  width: 100%;
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
