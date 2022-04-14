import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { IoIosMore } from 'react-icons/io';
import { Link } from 'react-router-dom';
import useDropDown from '@src/hook/useDropDown';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { openModal } from '@src/store/slices/modal.slice';
import ChatButton from '@src/components/ChatButton';

interface IProps {
  profileId: number;
  profileChatId: string;
}

function MoreButton({ profileId, profileChatId }: IProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  // 드롭다운 메뉴 커스텀 훅
  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  // 자기소개를 클릭하면 자기소개 모달창이 나타난다.
  const showDescModal = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(openModal({ mode: 'showDesc' }));
  };

  return (
    <Container>
      <MoreIconBox onClick={(e) => setOpenDropDown(!openDropDown)}>
        <MoreIcon />
      </MoreIconBox>
      {openDropDown && (
        <Dropdown ref={targetRef}>
          {profileId === user?.id && (
            <List>
              <Link to="/create/drawingForm">그림추가</Link>
            </List>
          )}

          <ChatButton chatUserId={profileChatId} />

          <List onClick={showDescModal}>자기소개</List>
        </Dropdown>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
const MoreIconBox = styled.div`
  background-color: ${({ theme }) => theme.palette.gray};
  border-radius: 50%;
  padding: 0.3rem;
  cursor: pointer;
`;
const MoreIcon = styled(IoIosMore)`
  font-size: 2rem;
`;
const Dropdown = styled.ul`
  position: absolute;
  top: 0;
  right: -7rem;
  background-color: ${({ theme }) => theme.palette.bgColor};
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
`;
const List = styled.li`
  font-size: 1.2rem;
  white-space: nowrap;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray};
  }
`;

export default MoreButton;
