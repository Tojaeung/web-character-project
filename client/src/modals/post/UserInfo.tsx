import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectPostPost } from '@src/store/slices/post.slice';
import { getUserInfo } from '@src/store/requests/etc.request';
import getLevel from '@src/utils/exp.util';
import relativeTime from '@src/utils/date.util';

function UserInfo() {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPostPost);

  const [drawingsNum, setDrawingsNum] = useState<number | null>(null);
  const [postsNum, setPostsNum] = useState<number | null>(null);
  const [commentsNum, setCommentsNum] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getUserInfo({ userId: post?.user.id! }))
      .unwrap()
      .then((res) => {
        const { drawingsNum, drawingCommentsNum, postsNum, postCommentsNum } = res;
        setDrawingsNum(drawingsNum);
        setPostsNum(postsNum);
        setCommentsNum(drawingCommentsNum + postCommentsNum);
      })

      .catch((err: any) => {
        alert(err.message);
      });
  }, []);

  return (
    <Container>
      <Title>유저정보</Title>
      <table>
        <tr>
          <th>닉네임</th>
          <td>{post?.user.nickname}</td>
        </tr>

        <tr>
          <th>그림 수</th>
          <td>{drawingsNum}</td>
        </tr>
        <tr>
          <th>게시글 수</th>
          <td>{postsNum}</td>
        </tr>

        <tr>
          <th>댓글 수</th>
          <td>{commentsNum}</td>
        </tr>

        <tr>
          <th>영감력</th>
          <td>{post?.user.exp}</td>
        </tr>
        <tr>
          <th>레벨</th>
          <td>{getLevel(post?.user.exp!)}</td>
        </tr>
        <tr>
          <th>가입일</th>
          <td>{relativeTime(post?.user.created_at!)}</td>
        </tr>
      </table>
    </Container>
  );
}

const Container = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  table {
    width: 100%;
    tr {
      padding: 1rem;
      th {
        font-size: 1.2rem;
        padding: 1rem;
        width: 8rem;
        white-space: nowrap;
        font-weight: 500;
        background-color: ${({ theme }) => theme.palette.gray};
      }
      td {
        font-size: 1.1rem;
        padding: 1rem;
        border: 1px solid ${({ theme }) => theme.palette.gray};
      }
    }
  }
`;
const Title = styled.h1`
  font-size: 1.5rem;
`;

export default UserInfo;
