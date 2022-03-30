import React from 'react';
import styled from 'styled-components';
import Avatar from '@src/components/common/Avatar';
import Nickname from '@src/components/common/Nickname';
import CreatedTime from '@src/components/common/CreatedTime';
import RemoveCommentBtn from '@src/components/common/RemoveCommentBtn';
import { DrawingCommentType, PostCommentType } from '@src/types';
import EditCommentForm from '@src/components/common/EditCommentForm';

interface IProps {
  comment: DrawingCommentType | PostCommentType;
  index: number;
  setSelectedCommentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  isSelected: boolean;
}

function Comment({ comment, index, setSelectedCommentIndex, isSelected }: IProps) {
  const onSelectCommentIndex = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCommentIndex(index);
  };

  return (
    <Container>
      <div className="profile">
        <div className="flex-wrapper">
          <Avatar src={comment.user.avatar} size="small" />
          <Nickname exp={comment.user.exp} nickname={comment.user.nickname} size="small" />
        </div>
        <CreatedTime createdTime={comment.created_at} size="small" />
      </div>
      <div className="comment">
        <pre>{comment.content}</pre>
        <div className="btn">
          <button onClick={onSelectCommentIndex}>dd</button>
          <RemoveCommentBtn id={comment.id} />
        </div>
      </div>
      {isSelected && <EditCommentForm commentId={comment.id} category="drawing" />}
    </Container>
  );
}

const Container = styled.div`
  .profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .flex-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
  .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    pre {
      font-size: 1.2rem;
      padding: 1rem;
    }
    .btn {
      display: flex;
      align-items: center;
      gap: 1rem;
      button {
      }
    }
  }
`;

export default Comment;
