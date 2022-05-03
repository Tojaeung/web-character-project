import React from 'react';
import styled from 'styled-components';
import Avatar from '@src/components/Avatar';
import { useParams } from 'react-router-dom';
import Nickname from '@src/components/Nickname';
import CreatedTime from '@src/components/CreatedTime';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';
import { deleteDrawingComment } from '@src/store/requests/drawing.request';
import { deletePostComment } from '@src/store/requests/board.request';
import EditCommentForm from '@src/components/comment/EditCommentForm';
import { inverseGreenButtonStyle, redButtonStyle } from '@src/styles/button.style';
import {
  DrawingCommentType,
  FreeCommentType,
  CommissionCommentType,
  RequeCommentType,
  SaleCommentType,
} from '@src/types';

interface IProps {
  type: 'drawing' | 'board';
  comment: DrawingCommentType | FreeCommentType | CommissionCommentType | RequeCommentType | SaleCommentType;
  index: number;
  setCommentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  isSelected: boolean;
}

function CommentList({ type, comment, index, setCommentIndex, isSelected }: IProps) {
  const dispatch = useAppDispatch();
  const { board } = useParams();

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
        await dispatch(deletePostComment({ board: board as string, commentId: comment.id })).unwrap();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <Container>
      <UserBox>
        <UserInfoBox>
          <Avatar src={comment.user?.avatar} size="small" />
          <Nickname
            exp={comment.user?.exp!}
            userId={comment.user?.id}
            chatId={comment.user?.chatId}
            desc={comment.user?.desc}
            nickname={comment.user?.nickname!}
            dropDown={true}
            size="small"
          />
        </UserInfoBox>
        <CreatedTime createdTime={comment.created_at} size="small" />
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
