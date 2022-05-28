import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'store/app/hook';
import { getUserInfo } from 'store/requests/user.request';
import Exp from 'components/Exp';
import relativeTime from 'utils/date.util';
import { UserType } from 'interfaces/index';
import { useAppSelector } from 'store/app/hook';
import { selectUserUser } from 'store/slices/user.slice';

interface IProp {
  props: { userId: number };
}

function UserInfo({ props }: IProp) {
  const { userId } = props;

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUserUser);

  const [userInfo, setUserInfo] = useState<UserType>();
  const [drawingsNum, setDrawingsNum] = useState<number>();
  const [totalPostsNum, setTotalPostsNum] = useState<number>();
  const [totalCommentsNum, setTotalCommentsNum] = useState<number>();

  useEffect(() => {
    dispatch(getUserInfo({ userId }))
      .unwrap()
      .then((res) => {
        const { user, drawingsNum, totalPostsNum, totalCommentsNum } = res;
        setUserInfo(user);
        setDrawingsNum(drawingsNum);
        setTotalPostsNum(totalPostsNum);
        setTotalCommentsNum(totalCommentsNum);
      })
      .catch((err: any) => {
        alert(err.message);
      });
  }, []);

  return (
    <Container>
      <Title>{user?.id === userId ? '내 정보' : '유저정보'}</Title>
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
            <td>{totalPostsNum}</td>
          </tr>

          <tr>
            <td>댓글 수</td>
            <td>{totalCommentsNum}</td>
          </tr>

          <tr>
            <td>영감력</td>
            <td>{userInfo?.exp}</td>
          </tr>
          <tr>
            <td>레벨</td>
            <td>
              <Exp exp={userInfo?.exp!} role={userInfo?.role!} isPenalty={userInfo?.isPenalty!} />
            </td>
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
  width: 25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-size: 2rem;
  align-self: flex-start;
`;

export default UserInfo;
