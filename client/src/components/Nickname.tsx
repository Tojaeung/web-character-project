import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import getLevel from '@src/utils/exp.util';
import ChatButton from '@src/components/ChatButton';
import useDropDown from '@src/hooks/useDropDown';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';
import { openModal } from '@src/store/slices/modal.slice';

interface IProps {
  exp: number;
  userId?: number;
  chatId?: string;
  desc?: string;
  nickname: string;
  dropDown?: boolean;
  fontSize: number;
}

function Nickname({ exp, userId, chatId, desc, nickname, dropDown = false, fontSize }: IProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserUser);

  // 드롭다운 메뉴 커스텀 훅
  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  const openDescModal = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(openModal({ modal: 'desc', props: { userId, desc } }));
  };

  const openPenaltyModal = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(openModal({ modal: 'penalty', props: { userId } }));
  };

  const openUserInfoModal = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(openModal({ modal: 'userInfo', props: { userId } }));
  };

  return (
    <>
      <Container>
        <NicknameBox fontSize={fontSize} dropDown={dropDown} onClick={(e) => setOpenDropDown(!openDropDown)}>
          <Level>[Lv.{getLevel(exp)}]</Level>
          <NickName>{nickname}</NickName>
        </NicknameBox>
        {openDropDown && dropDown && (
          <Dropdown ref={targetRef} onClick={(e) => setOpenDropDown(!openDropDown)}>
            <List>
              <GoProfile href={`/profile/${userId}`}>프로필 보기</GoProfile>
            </List>

            {userId === user?.id && (
              <List>
                <Link to="/create/drawingForm">그림추가</Link>
              </List>
            )}

            <List>작성글 보기</List>
            <List onClick={openUserInfoModal}>{user?.id === userId ? '내 정보' : '유저정보'}</List>
            <List onClick={openDescModal}>자기소개</List>
            <ChatButton chatUserId={chatId!} />

            {user?.role === 'admin' && <List onClick={openPenaltyModal}>불량유저</List>}
          </Dropdown>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
`;

const NicknameBox = styled.div<{ fontSize: number; dropDown: boolean }>`
  ${({ fontSize }) => {
    return css`
      font-size: ${fontSize}rem;
    `;
  }};
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
`;

const Level = styled.span``;

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

const NickName = styled.span``;

const GoProfile = styled.a``;
export default Nickname;
