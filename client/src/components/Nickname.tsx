import React, { useState, useRef } from 'react';
import getLevel from '@src/utils/exp.util';
import styled, { css } from 'styled-components';
import ChatButton from '@src/components/ChatButton';
import useDropDown from '@src/hook/useDropDown';
import useModal from '@src/hook/useModal';
import UserInfoModal from '@src/modals/UserInfo';
import { useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';

interface IProps {
  exp: number;
  userId?: number | null;
  userChatId?: string | null;
  nickname: string;
  dropDown?: boolean;
  size: 'small' | 'medium' | 'large';
}

function Nickname({ exp, userId = null, userChatId = null, nickname, dropDown = false, size }: IProps) {
  const user = useAppSelector(selectAuthUser);

  const { isOpen, openModalHook, closeModalHook } = useModal();

  // 드롭다운 메뉴 커스텀 훅
  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

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
              <GoProfile href={`/profile/${userId}`}>프로필 보기</GoProfile>
            </List>
            <List>작성글 보기</List>
            <List onClick={openModalHook}>{user?.id === userId ? '내 정보' : '유저정보'}</List>
            <ChatButton chatPartnerUserId={userChatId!} />
          </Dropdown>
        )}
      </Container>
      {isOpen && <UserInfoModal isOpen={isOpen} closeModalHook={closeModalHook} userId={userId!} />}
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
  ${({ dropDown }) => {
    if (dropDown) {
      return css`
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      `;
    } else {
      return css`
        cursor: default;
        text-decoration: none;
      `;
    }
  }}

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

const GoProfile = styled.a``;
export default Nickname;
