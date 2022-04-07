import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import boardTitle from '@src/utils/boardTitle.util';
import Board from '@src/pages/board';
import { selectPostPost } from '@src/store/slices/post.slice';
import { getPost } from '@src/store/requests/post.request';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import CreatedTime from '@src/components/CreatedTime';
import Comment from '@src/components/comment';

function Post() {
  const dispatch = useAppDispatch();
  const { postId } = useParams();

  const selectedPost = useAppSelector(selectPostPost);

  useEffect(() => {
    dispatch(getPost({ postId: postId! })).unwrap();
  }, [postId]);

  return (
    <Container>
      <BoardName>{boardTitle(selectedPost?.board as string)}</BoardName>
      <TitleBox>
        <PostTitle>{selectedPost?.title}</PostTitle>
        <CreatedTime createdTime={selectedPost?.user.created_at!} size="medium" />
      </TitleBox>
      <Header>
        <Avatar src={selectedPost?.user.avatar} size="medium" />
        <Nickname exp={selectedPost?.user.exp!} nickname={selectedPost?.user.nickname!} size="medium" />
      </Header>

      <Content dangerouslySetInnerHTML={{ __html: selectedPost?.content as string }} />
      <Comment type="board" comments={selectedPost?.postComments!} />
      <Board />
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.bgColor};
`;
const BoardName = styled.h1`
  padding: 1rem;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
  padding: 1rem 2rem;
`;
const PostTitle = styled.h3``;
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
