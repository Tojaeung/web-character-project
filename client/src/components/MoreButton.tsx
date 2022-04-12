import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineMore } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useDropDown from '@src/hook/useDropDown';
import ReportModal from '@src/modals/Report';
import useReportModal from '@src/hook/useReportModal';
import { DrawingType, PostType } from '@src/types';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { closeModal } from '@src/store/slices/modal.slice';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { selectDrawingDrawings, selectDrawingIndex } from '@src/store/slices/drawing.slice';
import { selectPostPost } from '@src/store/slices/post.slice';

interface IProps {
  type: 'drawing' | 'board';
  entity: DrawingType | PostType;
  handleRemove: (e: any) => void;
}

function MoreButton({ type, entity, handleRemove }: IProps) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const drawings = useAppSelector(selectDrawingDrawings);
  const index = useAppSelector(selectDrawingIndex);
  const post = useAppSelector(selectPostPost);

  // 신고하기 모달 커스텀 훅
  const { isOpen, openReportModal, closeReportModal } = useReportModal();

  // 드롭다운 메뉴 커스텀 훅
  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  // 수정
  const goEdit = async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(closeModal());
    navigate(`/edit/postForm/${entity?.id}`);
  };
  return (
    <>
      <Container>
        <MoreIcon onClick={(e) => setOpenDropDown(!openDropDown)} />
        {openDropDown && (
          <Dropdown ref={targetRef}>
            {type === 'board' && user?.id === post?.user.id && <List onClick={goEdit}>수정</List>}

            {type === 'drawing' && user?.id === drawings[index!].user_id && <List onClick={handleRemove}>삭제</List>}
            {type === 'board' && user?.id === post?.user.id && <List onClick={handleRemove}>삭제</List>}

            <List onClick={openReportModal}>신고</List>
          </Dropdown>
        )}
      </Container>
      <ReportModal isOpen={isOpen} closeReportModal={closeReportModal} proof={entity} />
    </>
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