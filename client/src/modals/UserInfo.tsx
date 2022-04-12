import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectPostPost } from '@src/store/slices/post.slice';
import { selectDrawingDrawings, selectDrawingIndex } from '@src/store/slices/drawing.slice';
import { getUserInfo } from '@src/store/requests/etc.request';
import getLevel from '@src/utils/exp.util';
import relativeTime from '@src/utils/date.util';
import { UserType } from '@src/types';

function UserInfo() {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPostPost);
  const drawings = useAppSelector(selectDrawingDrawings);
  const index = useAppSelector(selectDrawingIndex);

  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [drawingsNum, setDrawingsNum] = useState<number | null>(null);
  const [postsNum, setPostsNum] = useState<number | null>(null);
  const [commentsNum, setCommentsNum] = useState<number | null>(null);

  useEffect(() => {
    // 게시판에서 유정정보를 요청한다면 반드시 리덕스변수 post가 있기 때문에 사용하였다.
    if (post) {
      dispatch(getUserInfo({ userId: post?.user.id! }))
        .unwrap()
        .then((res) => {
          const { userInfo, drawingsNum, drawingCommentsNum, postsNum, postCommentsNum } = res;
          setUserInfo(userInfo);
          setDrawingsNum(drawingsNum);
          setPostsNum(postsNum);
          setCommentsNum(drawingCommentsNum + postCommentsNum);
        })

        .catch((err: any) => {
          alert(err.message);
        });
    } else {
      // 그림모달에서 유저정보를 요청한다면 반드시 리덕스변수 drawings가 있기 때문에 사용하였다.
      dispatch(getUserInfo({ userId: drawings[index!].user?.id! }))
        .unwrap()
        .then((res) => {
          const { userInfo, drawingsNum, drawingCommentsNum, postsNum, postCommentsNum } = res;
          setUserInfo(userInfo);
          setDrawingsNum(drawingsNum);
          setPostsNum(postsNum);
          setCommentsNum(drawingCommentsNum + postCommentsNum);
        })
        .catch((err: any) => {
          alert(err.message);
        });
    }
  }, []);

  return (
    <Container>
      <Title>유저정보</Title>
      <table>
        <tr>
          <th>닉네임</th>
          <td>{userInfo?.nickname}</td>
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
          <td>{userInfo?.exp}</td>
        </tr>
        <tr>
          <th>레벨</th>
          <td>{getLevel(userInfo?.exp!)}</td>
        </tr>
        <tr>
          <th>가입일</th>
          <td>{relativeTime(userInfo?.created_at!)}</td>
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
