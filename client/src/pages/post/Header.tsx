import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMore, AiOutlineUnorderedList } from 'react-icons/ai';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import Button from '@src/components/Button';
import { selectPostPost } from '@src/store/slices/post.slice';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { removePost } from '@src/store/requests/post.request';
import useDropDown from '@src/hook/useDropDown';
import ReportModal from '@src/modals/Report';
import useReportModal from '@src/hook/useReportModal';

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const post = useAppSelector(selectPostPost);

  // 신고하기 모달 커스텀 훅
  const { isOpen, openReportModal, closeReportModal } = useReportModal();

  // 게시글 삭제
  const handleRemovePost = async (e: any) => {
    try {
      const res = await dispatch(removePost({ postId: Number(post?.id) })).unwrap();
      alert(res.message);
      navigate(`/board/${post?.board}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // 드롭다운 메뉴 커스텀 훅
  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  return (
    <>
      <Container>
        <ProfileBox>
          <Avatar src={post?.user.avatar} size="medium" />
          <Nickname
            exp={post?.user.exp!}
            userId={post?.user.id!}
            nickname={post?.user.nickname!}
            dropDown={true}
            size="medium"
          />
        </ProfileBox>

        <ButtonBox>
          <BackBoard color="black" size="small" inverse={true} onClick={(e) => navigate(`/board/${post?.board}`)}>
            목록
          </BackBoard>
          <EditPost color="green" size="small" inverse={true} onClick={(e) => navigate(`/edit/postForm/${post?.id}`)}>
            수정
          </EditPost>
          <RemovePost color="red" size="small" inverse={true} onClick={handleRemovePost}>
            삭제
          </RemovePost>
          <ReportPost color="red" size="small" onClick={openReportModal}>
            신고
          </ReportPost>
        </ButtonBox>

        <ResponsiveButtonBox>
          <BackBoardIcon onClick={(e) => navigate(`/board/${post?.board}`)} />
          <MoreIcon onClick={(e) => setOpenDropDown(!openDropDown)} />
          {openDropDown && (
            <Dropdown ref={targetRef}>
              <List onClick={(e) => navigate(`/edit/postForm/${post?.id}`)}>수정</List>
              <List onClick={handleRemovePost}>삭제</List>
              <List onClick={openReportModal}>신고</List>
            </Dropdown>
          )}
        </ResponsiveButtonBox>
      </Container>
      <ReportModal isOpen={isOpen} closeReportModal={closeReportModal} />
    </>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const BackBoard = styled(Button)`
  padding: 0.5rem;
  font-size: 1.2rem;
`;
const EditPost = styled(Button)`
  padding: 0.5rem;
  font-size: 1.2rem;
`;
const RemovePost = styled(Button)`
  padding: 0.5rem;
  font-size: 1.2rem;
`;
const ReportPost = styled(Button)`
  padding: 0.5rem;
  font-size: 1.2rem;
`;

const ResponsiveButtonBox = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 1011;
  }
`;

const BackBoardIcon = styled(AiOutlineUnorderedList)`
  font-size: 2.2rem;
  cursor: pointer;
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
`;
export default Header;
