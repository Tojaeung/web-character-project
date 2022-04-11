import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import Button from '@src/components/Button';
import { selectPostPost } from '@src/store/slices/post.slice';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { removePost } from '@src/store/requests/post.request';
import ReportModal from '@src/modals/Report';
import useReportModal from '@src/hook/useReportModal';
import MoreButton from '@src/components/MoreButton';

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
        <ReportModal
          isOpen={isOpen}
          closeReportModal={closeReportModal}
          suspect={post?.user.nickname!}
          title={post?.title!}
          content={post?.content!}
        />

        <ResponsiveButtonBox>
          <BackBoardIcon onClick={(e) => navigate(`/board/${post?.board}`)} />
          <MoreButton entity={post!} handleRemove={handleRemovePost} />
        </ResponsiveButtonBox>
      </Container>
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

export default Header;
