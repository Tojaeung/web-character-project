import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Avatar from 'components/Avatar';
import Nickname from 'components/Nickname';
import {
  inverseBlackButtonStyle,
  inverseGreenButtonStyle,
  redButtonStyle,
  inverseRedButtonStyle,
} from 'styles/button.style';
import { selectUserUser } from 'store/slices/user.slice';
import { selectPostPost } from 'store/slices/post.slice';
import { useAppSelector, useAppDispatch } from 'store/app/hook';
import { deletePost } from 'store/requests/post.request';
import { openModal } from 'store/slices/modal.slice';
import MoreButton from 'components/MoreButton';

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { board, postId } = useParams();

  const user = useAppSelector(selectUserUser);
  const post = useAppSelector(selectPostPost);

  // 게시글 삭제
  const handleRemovePost = async (e: any) => {
    try {
      const res = await dispatch(deletePost({ postId: Number(postId) })).unwrap();
      alert(res.message);
      navigate(`/${board}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const openReportModal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ modal: 'report', props: { suspectId: post?.user?.id } }));
  };

  return (
    <>
      <Container>
        <ProfileBox>
          <Avatar src={post?.user?.avatar} diameter={3.5} />
          <Nickname user={post?.user!} dropDown={true} fontSize={1.3} />
        </ProfileBox>

        <ButtonBox>
          <BackBoard onClick={(e) => navigate(`/${board}`)}>목록</BackBoard>
          {(user?.id === post?.user?.id || user?.role === 'admin') && (
            <>
              <EditPost onClick={(e) => navigate(`/edit/postForm/${board}/${post?.id}`)}>수정</EditPost>
              <RemovePost onClick={handleRemovePost}>삭제</RemovePost>
            </>
          )}

          <ReportPost onClick={openReportModal}>신고</ReportPost>
        </ButtonBox>

        <ResponsiveButtonBox>
          <BackBoardIcon onClick={(e) => navigate(`/${board}`)} />
          <MoreButton type="board" entityId={post?.id!} userId={post?.user?.id!} handleRemove={handleRemovePost} />
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

const BackBoard = styled.button`
  ${inverseBlackButtonStyle};
  padding: 0.5rem;
  font-size: 1.2rem;
`;
const EditPost = styled.button`
  ${inverseGreenButtonStyle};
  padding: 0.5rem;
  font-size: 1.2rem;
`;
const RemovePost = styled.button`
  ${inverseRedButtonStyle};
  padding: 0.5rem;
  font-size: 1.2rem;
`;
const ReportPost = styled.button`
  ${redButtonStyle};
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
