import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '@src/store/app/hook';
import { getUserInfo } from '@src/store/requests/etc.request';
import getLevel from '@src/utils/exp.util';
import relativeTime from '@src/utils/date.util';
import { UserType } from '@src/types';
import { useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';

interface IProps {
  isOpen: boolean;
  closeModalHook: () => void;
  userId: number;
}

function UserInfo({ isOpen, closeModalHook, userId }: IProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);

  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [drawingsNum, setDrawingsNum] = useState<number | null>(null);
  const [postsNum, setPostsNum] = useState<number | null>(null);
  const [commentsNum, setCommentsNum] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getUserInfo({ userId }))
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

  if (!isOpen) return null;
  return createPortal(
    <Container>
      <Background onClick={closeModalHook} />
      <ModalBox>
        <CloseIcon onClick={closeModalHook} />
        <Title>{user?.id === userId ? '내 정보' : '유저정보'}</Title>
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
      </ModalBox>
    </Container>,
    document.getElementById('modalPortal') as HTMLElement
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

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1050;
`;
const ModalBox = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 1050;
  gap: 1.5rem;
`;

const CloseIcon = styled(AiOutlineClose)`
  align-self: flex-end;
  font-size: 2rem;
`;
const Title = styled.h1`
  font-size: 1.8rem;
`;

export default UserInfo;
