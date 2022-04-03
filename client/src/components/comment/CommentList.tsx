import React from 'react';
import styled from 'styled-components';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import CreatedTime from '@src/components/CreatedTime';
import { useAppDispatch } from '@src/store/app/hook';
import { removeDrawingComment } from '@src/store/requests/drawing.request';
import { DrawingCommentType, PostCommentType } from '@src/types';
import EditCommentForm from '@src/components/comment/EditCommentForm';
import Button from '@src/components/Button';

interface IProps {
  type: 'drawing' | 'board';
  comment: DrawingCommentType | PostCommentType;
  index: number;
  setCommentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  isSelected: boolean;
}

function CommentList({ type, comment, index, setCommentIndex, isSelected }: IProps) {
  const dispatch = useAppDispatch();

  // 댓글 수정폼 나타내기
  const openEditCommemtForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCommentIndex(index);
  };

  // 댓글 삭제하기
  const handleRemoveComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'drawing') {
      await dispatch(removeDrawingComment({ drawingCommentId: comment.id }));
    } else if (type === 'board') {
    }
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
          <EditButton color="green" size="small" inverse={true} onClick={openEditCommemtForm}>
            수정
          </EditButton>
          <RemoveButton color="red" size="small" onClick={handleRemoveComment}>
            삭제
          </RemoveButton>
        </ButtonBox>
      </ContentBox>

      {/* 수정폼  */}
      {isSelected && <EditCommentForm type={type} commentId={comment.id} setCommentIndex={setCommentIndex} />}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dotted ${({ theme }) => theme.palette.black};
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
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 1.3rem;
  padding: 1rem;
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const EditButton = styled(Button)`
  padding: 0.5rem;
`;
const RemoveButton = styled(Button)`
  padding: 0.5rem;
`;

export default CommentList;
