import { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectPostPost } from '@src/store/slices/post.slice';
import { getPost } from '@src/store/requests/post.request';
import CreatedTime from '@src/components/CreatedTime';
import Comment from '@src/components/comment';
import CommentForm from '@src/components/CommentForm';
import LikeButton from '@src/components/LikeButton';
import DisLikeButton from '@src/components/DisLikeButton';
import Header from './Header';
import Board from '@src/pages/board/[board]';

function Post() {
  const dispatch = useAppDispatch();

  const { postId } = useParams();

  const post = useAppSelector(selectPostPost);

  // 게시글 데이터 가져오기
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    dispatch(getPost({ postId: Number(postId) })).catch((err) => alert(err.message));
  }, [dispatch, postId]);

  return (
    <Container>
      <BoardName>{post?.board?.krName}</BoardName>
      <TitleBox>
        <PostTitle>{post?.title}</PostTitle>
        <CreatedTime createdTime={post?.created_at!} fontSize={1.2} />
      </TitleBox>

      <Header />
      <Content dangerouslySetInnerHTML={{ __html: post?.content as string }} />

      <LikeButtonBox>
        좋아요
        <LikeButton type="board" userId={post?.user?.id!} likes={post?.likes!} dislikes={post?.dislikes!} />
        |
        <DisLikeButton type="board" userId={post?.user?.id!} likes={post?.likes!} dislikes={post?.dislikes!} />
        싫어요
      </LikeButtonBox>

      <CommentForm type="board" userId={post?.user_id} />
      <Comment type="board" comments={post?.comments!} />
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
  padding: 1.5rem 0;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 1rem 0;
  }
`;
const PostTitle = styled.p`
  font-weight: bold;
  flex-wrap: wrap;
  word-break: break-all;
  font-size: 1.7rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.3rem;
  }
`;
const Content = styled.div`
  width: 100%;
  font-size: 1.4rem;
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
