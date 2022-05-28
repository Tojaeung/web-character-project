import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Exp from 'components/Exp';
import ChatButton from 'components/ChatButton';
import useDropDown from 'hooks/useDropDown';
import { useAppSelector, useAppDispatch } from 'store/app/hook';
import { selectUserUser } from 'store/slices/user.slice';
import { openModal } from 'store/slices/modal.slice';
import { UserType } from 'interfaces/index';

interface IProps {
  user: UserType;
  dropDown?: boolean; // 닉네임 드롭다운(프로필보기, 대화하기 등등..) 유무
  fontSize: number;
}

function Nickname({ user, dropDown = false, fontSize }: IProps) {
  const dispatch = useAppDispatch();

  const me = useAppSelector(selectUserUser);

  // 드롭다운 메뉴 커스텀 훅
  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  const openDescModal = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(openModal({ modal: 'desc', props: { userId: user.id, desc: user.desc } }));
  };

  const openPenaltyModal = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(openModal({ modal: 'penalty', props: { userId: user.id } }));
  };

  const openUserInfoModal = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(openModal({ modal: 'userInfo', props: { userId: user.id } }));
  };

  return (
    <>
      {user && (
        <Container>
          <NicknameBox fontSize={fontSize} dropDown={dropDown} onClick={(e) => setOpenDropDown(!openDropDown)}>
            <Exp exp={user.exp} role={user.role} isPenalty={user.isPenalty} />
            <NickName>{user.nickname}</NickName>
          </NicknameBox>
          {openDropDown && dropDown && (
            <Dropdown ref={targetRef} onClick={(e) => setOpenDropDown(!openDropDown)}>
              <List>
                <GoProfile href={`/profile/${user.id}`}>프로필 보기</GoProfile>
              </List>

              <List onClick={openUserInfoModal}>{me?.id === user.id ? '내 정보' : '유저정보'}</List>
              <List onClick={openDescModal}>자기소개</List>

              {user.id !== me?.id && <ChatButton chatUserId={user.chatId!} />}

              {me?.role === 'admin' && user.id !== me.id && <List onClick={openPenaltyModal}>불량유저</List>}
            </Dropdown>
          )}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: relative;
`;

const NicknameBox = styled.div<{ fontSize: number; dropDown: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
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
