import React from 'react';
import styled from 'styled-components';
import Avatar from 'components/Avatar';
import Nickname from 'components/Nickname';
import CreatedTime from 'components/CreatedTime';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { selectUserUser } from 'store/slices/user.slice';
import { deleteDrawingComment } from 'store/requests/drawing.request';
import { deletePostComment } from 'store/requests/post.request';
import EditCommentForm from 'components/comment/EditCommentForm';
import { inverseGreenButtonStyle, redButtonStyle } from 'styles/button.style';
import { DrawingCommentType, PostCommentType } from 'interfaces/index';

interface IProps {
  type: 'drawing' | 'board';
  comment: DrawingCommentType | PostCommentType;
  index: number;
  setCommentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  isSelected: boolean;
}

function CommentList({ type, comment, index, setCommentIndex, isSelected }: IProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUserUser);

  // 댓글 수정폼 나타내기
  const openEditCommemtForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCommentIndex(index);
  };

  // 댓글 삭제하기
  const handleRemoveComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'drawing') {
      try {
        await dispatch(deleteDrawingComment({ commentId: comment.id })).unwrap();
      } catch (err: any) {
        alert(err.message);
      }
    }
    if (type === 'board') {
      try {
        await dispatch(deletePostComment({ commentId: comment.id })).unwrap();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <Container>
      <UserBox>
        <UserInfoBox>
          <Avatar src={comment.user?.avatar} diameter={3} />
          <Nickname user={comment.user!} dropDown={true} fontSize={1.3} />
        </UserInfoBox>
        <CreatedTime createdTime={comment.created_at} fontSize={1.2} />
      </UserBox>

      <ContentBox>
        <Content>{comment.content}</Content>
        {(user?.id === comment.user?.id || user?.role === 'admin') && (
          <ButtonBox>
            <EditButton onClick={openEditCommemtForm}>수정</EditButton>
            <RemoveButton onClick={handleRemoveComment}>삭제</RemoveButton>
          </ButtonBox>
        )}
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
const EditButton = styled.button`
  padding: 0.5rem;
  font-size: 1.2rem;
  ${inverseGreenButtonStyle};
`;
const RemoveButton = styled.button`
  padding: 0.5rem;
  font-size: 1.2rem;
  ${redButtonStyle};
`;

export default CommentList;
