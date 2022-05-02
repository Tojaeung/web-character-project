import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@src/store/app/hook';
import { getUserInfo } from '@src/store/requests/etc.request';
import getLevel from '@src/utils/exp.util';
import relativeTime from '@src/utils/date.util';
import { UserType } from '@src/types';
import { useAppSelector } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';

interface IProp {
  props: { userId: number };
}

function UserInfo({ props }: IProp) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUserUser);

  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [drawingsNum, setDrawingsNum] = useState<number | null>(null);
  const [postsNum, setPostsNum] = useState<number | null>(null);
  const [commentsNum, setCommentsNum] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getUserInfo({ userId: props.userId }))
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
  }, []);

  return (
    <Container>
      <Title>{user?.id === props.userId ? '내 정보' : '유저정보'}</Title>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>닉네임</td>
            <td>{userInfo?.nickname}</td>
          </tr>
          <tr>
            <td>그림 수</td>
            <td>{drawingsNum}</td>
          </tr>
          <tr>
            <td>게시글 수</td>
            <td>{postsNum}</td>
          </tr>

          <tr>
            <td>댓글 수</td>
            <td>{commentsNum}</td>
          </tr>

          <tr>
            <td>영감력</td>
            <td>{userInfo?.exp}</td>
          </tr>
          <tr>
            <td>레벨</td>
            <td>{getLevel(userInfo?.exp!)}</td>
          </tr>
          <tr>
            <td>가입일</td>
            <td>{relativeTime(userInfo?.created_at!)}</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

const Container = styled.div`
  table {
    width: 100%;
    tr {
      padding: 1rem;
      td:nth-child(1) {
        font-size: 1.2rem;
        padding: 1rem;
        width: 8rem;
        white-space: nowrap;
        font-weight: 500;
        text-align: center;
        background-color: ${({ theme }) => theme.palette.gray};
      }
      td:nth-child(2) {
        text-align: center;
        font-size: 1.1rem;
        padding: 1rem;
        border: 1px solid ${({ theme }) => theme.palette.gray};
      }
    }
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  align-self: flex-start;
`;

export default UserInfo;