import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import getLevel from '@src/utils/exp.util';
import relativeTime from '@src/utils/date.util';
import boardTitle from '@src/utils/boardTitle.util';
import Board from '@src/pages/board/[board]';
import { useGetPost } from '@src/hook/useInitPage';
// import { greenButtonStyle } from '@src/styles/GlobalStyles';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { selectBoardPost } from '@src/store/slices/board.slice';
import { addPostComment } from '@src/store/requests/board.request';

function Post() {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  useGetPost(Number(postId));
  const post = useAppSelector(selectBoardPost);
  const user = useAppSelector(selectAuthUser);

  const [comment, setComment] = useState('');

  const onAddPostComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(addPostComment({ userId: user?.id!, postId: Number(postId), content: comment }));
    setComment('');
  };

  return (
    <Container>
      <h1>{boardTitle(post?.board as string)}</h1>
      <h3>{post?.title}</h3>
      <div className="header">
        <div className="flex-wrapper">
          <div className="image">
            <img src={post?.user.avatar} alt="프사" />
          </div>
          <span>
            [Lv.{getLevel(post?.user.exp as number)}] {post?.user.nickname}
          </span>
        </div>
        <span>{relativeTime(post?.created_at as Date)}</span>
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: post?.content as string }} />

      <h2>댓글 {post?.postComments.length}개</h2>
      <ul>
        {post &&
          post?.postComments.map((postComment) => (
            <li>
              <div className="comment">
                <div className="comment-header">
                  <div className="avatar">
                    <img src={postComment.user.avatar} alt="프사" />
                  </div>
                  <span>[Lv.{getLevel(postComment.user.exp)}]</span>
                  <span>{postComment.user.nickname}</span>
                </div>
                <span>{relativeTime(postComment.user.created_at)}</span>
              </div>
              <p>{postComment.content}</p>
            </li>
          ))}

        <div className="comment-createForm">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          <button onClick={onAddPostComment}>댓글등록</button>
        </div>
      </ul>
      <Board />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h1 {
    font-size: 3rem;
    font-weight: 700;
    background-color: ${({ theme }) => theme.palette.green};
    color: ${({ theme }) => theme.palette.white};
  }

  h3 {
    font-size: 2rem;
    font-weight: 500;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    font-size: 1.7rem;
    .flex-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;

      .image {
        width: 4rem;
        height: 4rem;
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid ${({ theme }) => theme.palette.black};
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  h2 {
    font-size: 2rem;
  }
  ul {
    border: 1px solid ${({ theme }) => theme.palette.borderColor};
    padding: 0.5rem;
    li {
      border-bottom: 1px dotted ${({ theme }) => theme.palette.borderColor};
      margin: 0.5rem;
      .comment {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .comment-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.3rem;
          .avatar {
            width: 3rem;
            height: 3rem;
            overflow: hidden;
            border-radius: 50%;
            border: 1px solid ${({ theme }) => theme.palette.black};
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      p {
        padding: 1rem;
        font-size: 1.5rem;
      }
    }
    .comment-createForm {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      padding: 2rem;
      background-color: ${({ theme }) => theme.palette.gray};
      textarea {
        width: 100%;
        min-height: 10rem;
        resize: none;
        outline: none;
        border: 0;
      }
      button {
        align-self: flex-end;
        padding: 1rem 2rem;
      }
    }
  }
`;

export default Post;
