import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import getLevel from 'utils/exp.util';
import ChatButton from 'components/ChatButton';
import useDropDown from 'hooks/useDropDown';
import { useAppSelector, useAppDispatch } from 'store/app/hook';
import { selectUserUser } from 'store/slices/user.slice';
import { openModal } from 'store/slices/modal.slice';

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

            <List onClick={openUserInfoModal}>{user?.id === userId ? '내 정보' : '유저정보'}</List>
            <List onClick={openDescModal}>자기소개</List>

            {userId !== user?.id && <ChatButton chatUserId={chatId!} />}

            {user?.role === 'admin' && userId !== user.id && <List onClick={openPenaltyModal}>불량유저</List>}
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
  left: 5rem;
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
