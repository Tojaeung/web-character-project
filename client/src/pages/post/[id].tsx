import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import boardTitle from '@src/utils/boardTitle.util';
import Board from '@src/pages/board/[board]';
import { selectPostPost } from '@src/store/slices/post.slice';
import { getPost } from '@src/store/requests/post.request';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import CreatedTime from '@src/components/CreatedTime';
import Comment from '@src/components/comment';
import CommentForm from '@src/components/CommentForm';

function Post() {
  const dispatch = useAppDispatch();
  const { postId } = useParams();

  const post = useAppSelector(selectPostPost);

  useEffect(() => {
    dispatch(getPost({ postId: postId! })).unwrap();
  }, [postId]);

  return (
    <Container>
      <BoardName>{boardTitle(post?.board as string)}</BoardName>
      <TitleBox>
        <PostTitle>{post?.title}</PostTitle>
        <CreatedTime createdTime={post?.user.created_at!} size="small" />
      </TitleBox>
      <Header>
        <Avatar src={post?.user.avatar} size="medium" />
        <Nickname exp={post?.user.exp!} nickname={post?.user.nickname!} size="medium" />
      </Header>

      <Content dangerouslySetInnerHTML={{ __html: post?.content as string }} />
      <CommentForm type="board" id={post?.id!} />
      <Comment type="board" comments={post?.postComments!} />
      <Board />
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.bgColor};
`;
const BoardName = styled.h2`
  padding: 1rem;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
  padding: 1rem 2rem;
`;
const PostTitle = styled.p`
  font-weight: bold;
  flex-wrap: wrap;
  word-break: break-all;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;
const Content = styled.div`
  padding: 1rem;
`;

export default Post;
