import React, { useState, useRef } from 'react';
import getLevel from '@src/utils/exp.util';
import styled, { css } from 'styled-components';
import ChatButton from '@src/components/ChatButton';
import useDropDown from '@src/hook/useDropDown';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectPostPost } from '@src/store/slices/post.slice';
import { openModal } from '@src/store/slices/modal.slice';

interface IProps {
  exp: number;
  userId?: number | null;
  nickname: string;
  dropDown?: boolean;
  size: 'small' | 'medium' | 'large';
}

function Nickname({ exp, userId = null, nickname, dropDown = false, size }: IProps) {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPostPost);

  // 드롭다운 메뉴 커스텀 훅
  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  const openUserInfoModal = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(openModal({ mode: 'UserInfo' }));
  };

  return (
    <>
      <Container>
        <Level>[Lv.{getLevel(exp)}]</Level>
        <NickNameTag size={size} dropDown={dropDown} onClick={(e) => setOpenDropDown(!openDropDown)}>
          {nickname}
        </NickNameTag>
        {openDropDown && dropDown && (
          <Dropdown ref={targetRef}>
            <List>
              <a href={`/profile/${userId}`}>프로필 보기</a>
            </List>
            <List>작성글 보기</List>
            <List onClick={openUserInfoModal}>유저정보</List>
            <ChatButton chatPartnerUserId={post?.user.userId!} />
          </Dropdown>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Level = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 2.5rem;
  left: 3rem;
  z-index: 1007;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  background-color: ${({ theme }) => theme.palette.bgColor};
`;

const List = styled.li`
  white-space: nowrap;
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray};
  }
`;

const NickNameTag = styled.span<{ size: string; dropDown: boolean }>`
  cursor: ${({ dropDown }) => (dropDown ? 'pointer' : 'default')};
  &:hover {
    text-decoration: underline;
  }
  ${({ size }) => {
    if (size === 'small') {
      return css`
        font-size: 1.2rem;
      `;
    } else if (size === 'medium') {
      return css`
        font-size: 1.4rem;
      `;
    } else if (size === 'large') {
      return css`
        font-size: 1.6rem;
        font-weight: bold;
      `;
    }
  }};
`;

export default Nickname;
