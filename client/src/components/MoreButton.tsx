import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineMore } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useDropDown from 'hooks/useDropDown';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { openModal, closeModal } from 'store/slices/modal.slice';
import { selectUserUser } from 'store/slices/user.slice';

interface IProps {
  type: 'drawing' | 'board';
  entityId: number;
  userId: number;
  handleRemove: (e: any) => void;
}

function MoreButton({ type, entityId, userId, handleRemove }: IProps) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserUser);

  // 드롭다운 메뉴 커스텀 훅
  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  // 수정 (게시글만 수정가능, 그림은 수정 불가)
  const goEdit = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(closeModal());
    navigate(`/edit/postForm/${entityId}`);
  };

  const openReportModal = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(openModal({ modal: 'report', props: { suspectId: userId } }));
  };
  return (
    <Container>
      <MoreIcon onClick={(e) => setOpenDropDown(!openDropDown)} />
      {openDropDown && (
        <Dropdown ref={targetRef} onClick={(e) => setOpenDropDown(!openDropDown)}>
          {(user?.id === userId || user?.role === 'admin') && (
            <>
              {type === 'board' && <List onClick={goEdit}>수정</List>}
              <List onClick={handleRemove}>삭제</List>
            </>
          )}
          <List onClick={openReportModal}>신고</List>
        </Dropdown>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  z-index: 1030;
`;
const MoreIcon = styled(AiOutlineMore)`
  font-size: 2.2rem;
  cursor: pointer;
`;

const Dropdown = styled.ul`
  width: 7rem;
  background-color: ${({ theme }) => theme.palette.bgColor};
  top: 3rem;
  right: 1rem;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  position: absolute;
`;
const List = styled.li`
  padding: 1rem;
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray};
  }
`;

export default MoreButton;
