import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineMore, AiOutlineUnorderedList } from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import boardTitle from '@src/utils/boardTitle.util';
import Board from '@src/pages/board/[board]';
import { selectPostPost } from '@src/store/slices/post.slice';
import { getPost, removePost, addView } from '@src/store/requests/post.request';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import CreatedTime from '@src/components/CreatedTime';
import Comment from '@src/components/comment';
import CommentForm from '@src/components/CommentForm';
import LikeButton from '@src/components/LikeButton';
import DisLikeButton from '@src/components/DisLikeButton';
import Button from '@src/components/Button';
import useDropDown from '@src/hook/useDropDown';

function Post() {
  const dispatch = useAppDispatch();

  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useAppSelector(selectPostPost);

  useEffect(() => {
    dispatch(getPost({ postId: Number(postId) }));
    dispatch(addView({ postId: Number(postId) }));
  }, [postId]);

  const handleRemovePost = async (e: any) => {
    try {
      const res = await dispatch(removePost({ postId: Number(postId) })).unwrap();
      alert(res.message);
      navigate(`/board/${post?.board}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const [openDropDown, setOpenDropDown] = useState(false);
  const targetRef = useRef<HTMLUListElement>(null);

  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  return (
    <Container>
      <BoardName>{boardTitle(post?.board as string)}</BoardName>
      <TitleBox>
        <PostTitle>{post?.title}</PostTitle>
        <CreatedTime createdTime={post?.user.created_at!} size="small" />
      </TitleBox>
      <Header>
        <ProfileBox>
          <Avatar src={post?.user.avatar} size="medium" />
          <Nickname exp={post?.user.exp!} nickname={post?.user.nickname!} size="medium" />
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
          <ReportPost color="red" size="small">
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
              <List>신고</List>
            </Dropdown>
          )}
        </ResponsiveButtonBox>
      </Header>

      <Content dangerouslySetInnerHTML={{ __html: post?.content as string }} />

      <LikeButtonBox>
        좋아요
        <LikeButton type="board" id={post?.id!} likes={post?.likes!} dislikes={post?.dislikes!} /> |
        <DisLikeButton type="board" id={post?.id!} likes={post?.likes!} dislikes={post?.dislikes!} />
        싫어요
      </LikeButtonBox>

      <CommentForm type="board" id={post?.id!} />
      <Comment type="board" comments={post?.postComments!} />
      <Board />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.palette.bgColor};
`;
const BoardName = styled.h2`
  align-self: flex-start;
  font-size: 2rem;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
  padding: 2rem 0;
`;
const PostTitle = styled.p`
  font-weight: bold;
  flex-wrap: wrap;
  word-break: break-all;
  font-size: 1.7rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
  }
`;
const Header = styled.div`
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

const Content = styled.div`
  width: 100%;
  font-size: 1.5rem;
  line-height: 2rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

const LikeButtonBox = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  font-size: 1.4rem;
`;

export default Post;
