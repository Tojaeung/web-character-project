import React, { useState, useRef } from 'react';
import getLevel from '@src/utils/exp.util';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import ChatButton from '@src/components/ChatButton';
import useDropDown from '@src/hook/useDropDown';
import useReportModal from '@src/hook/useReportModal';
import ReportModal from '@src/modals/Report';
import { useAppSelector } from '@src/store/app/hook';
import { selectPostPost } from '@src/store/slices/post.slice';
import { selectAuthUser } from '@src/store/slices/auth.slice';

interface IProps {
  exp: number;
  userId?: number | null;
  nickname: string;
  dropDown?: boolean;
  size: 'small' | 'medium' | 'large';
}

function Nickname({ exp, userId = null, nickname, dropDown = false, size }: IProps) {
  const user = useAppSelector(selectAuthUser);
  const post = useAppSelector(selectPostPost);

  // 드롭다운 메뉴 커스텀 훅
  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  // 신고하기 모달 커스텀 훅
  const { isOpen, openReportModal, closeReportModal } = useReportModal();

  return (
    <>
      <Container dropDown={dropDown} onClick={(e) => setOpenDropDown(!openDropDown)}>
        <Level>[Lv.{getLevel(exp)}]</Level>
        <NickNameTag size={size}>{nickname}</NickNameTag>
        {openDropDown && dropDown && (
          <Dropdown ref={targetRef}>
            <List>
              <Link to={`/profile/${userId}`}>프로필 보기</Link>
            </List>
            {user?.id === post?.user.id ? null : (
              <List>
                <ChatButton design="list" chatPartnerUserId={post?.user.userId!} />
              </List>
            )}
            <List onClick={openReportModal}>신고하기</List>
          </Dropdown>
        )}
      </Container>
      <ReportModal isOpen={isOpen} closeReportModal={closeReportModal} />
    </>
  );
}

const Container = styled.div<{ dropDown: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${({ dropDown }) => (dropDown ? 'pointer' : 'default')};
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
    background-color: 1px solid ${({ theme }) => theme.palette.gray};
  }
`;

const NickNameTag = styled.span<{ size: string }>`
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
