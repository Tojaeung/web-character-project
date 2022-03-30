import React from 'react';
import styled from 'styled-components';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import CreatedTime from '@src/components/CreatedTime';
import RemoveCommentBtn from '@src/components/RemoveCommentBtn';
import { DrawingCommentType, PostCommentType } from '@src/types';
import EditCommentForm from '@src/components/comment/EditCommentForm';
import StyledButton from '@src/styles/StyledButton';

interface IProps {
  comment: DrawingCommentType | PostCommentType;
  index: number;
  setSelectedCommentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  isSelected: boolean;
}

function CommentList({ comment, index, setSelectedCommentIndex, isSelected }: IProps) {
  const onSelectCommentIndex = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCommentIndex(index);
  };

  return (
    <Container>
      <UserBox>
        <UserInfoBox>
          <Avatar src={comment.user.avatar} size="small" />
          <Nickname exp={comment.user.exp} nickname={comment.user.nickname} size="small" />
        </UserInfoBox>
        <CreatedTime createdTime={comment.created_at} size="small" />
      </UserBox>

      <ContentBox>
        <Content>{comment.content}</Content>

        <ButtonBox>
          <OpenEditCommentButton color="green" size="small" inverse={true} onClick={onSelectCommentIndex}>
            수정
          </OpenEditCommentButton>
          <RemoveCommentBtn id={comment.id} />
        </ButtonBox>
      </ContentBox>

      {isSelected && <EditCommentForm commentId={comment.id} category="drawing" />}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
`;
const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Content = styled.pre`
  font-size: 1.3rem;
  padding: 1rem;
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const OpenEditCommentButton = styled(StyledButton)``;

export default CommentList;
