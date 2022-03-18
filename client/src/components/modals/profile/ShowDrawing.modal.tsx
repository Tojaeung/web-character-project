import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  AiOutlineClose,
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineEye,
} from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '@src/redux/app/hook';
import { selectDrawingDrawing, initDrawing } from '@src/redux/slices/drawing.slice';
import { closeModal } from '@src/redux/slices/modal.slice';
import { selectProfileProfile } from '@src/redux/slices/profile.slice';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { addComment, addLike, addDisLike, removeLike, removeDisLike } from '@src/redux/requests/drawing.request';
import { greenButtonStyle } from '@src/styles/GlobalStyles';
import getLevel from '@src/utils/exp.util';
import relativeTime from '@src/utils/date.util';

function ShowDrawingModal() {
  const dispatch = useAppDispatch();
  const drawing = useAppSelector(selectDrawingDrawing);
  const profile = useAppSelector(selectProfileProfile);
  const user = useAppSelector(selectAuthUser);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const [comment, setComment] = useState('');

  const onCloseModal = async (e: React.MouseEvent<SVGElement>) => {
    document.body.style.overflow = 'unset';
    await dispatch(initDrawing());
    await dispatch(closeModal());
  };

  const onAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(addComment({ userId: user?.id!, drawingId: drawing?.id!, comment }));
    setComment('');
  };

  const onAddLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const existingLike = drawing?.likes?.filter((like) => like.user_id === user?.id).length!;
    const existingDisLike = drawing?.dislikes?.filter((dislike) => dislike.user_id === user?.id).length!;
    if (existingLike > 0 && existingDisLike === 0) {
      await dispatch(removeLike({ userId: user?.id! }));
    } else if (existingLike === 0 && existingDisLike > 0) {
      await dispatch(addLike({ userId: user?.id!, drawingId: drawing?.id! }));
      await dispatch(removeDisLike({ userId: user?.id! }));
    } else if (existingLike === 0 && existingDisLike === 0) {
      await dispatch(addLike({ userId: user?.id!, drawingId: drawing?.id! }));
    }
  };

  const onAddDisLike = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const existingLike = drawing?.likes?.filter((like) => like.user_id === user?.id).length!;
    const existingDisLike = drawing?.dislikes?.filter((dislike) => dislike.user_id === user?.id).length!;
    if (existingLike === 0 && existingDisLike > 0) {
      await dispatch(removeDisLike({ userId: user?.id! }));
    } else if (existingLike > 0 && existingDisLike === 0) {
      await dispatch(addDisLike({ userId: user?.id!, drawingId: drawing?.id! }));
      await dispatch(removeLike({ userId: user?.id! }));
    } else if (existingLike === 0 && existingDisLike === 0) {
      await dispatch(addDisLike({ userId: user?.id!, drawingId: drawing?.id! }));
    }
  };

  // 댓글 더보기 기능
  const [visible, setVisible] = useState(10);
  const onCommentMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVisible((prevVisible) => prevVisible + 30);
  };

  return (
    <Container>
      <div className="left">
        <div className="image">
          <img src={drawing?.url} alt="이미지" />
        </div>
      </div>

      <div className="right">
        <div className="header">
          <p>제목: {drawing?.title}</p>
          <AiOutlineClose className="close-icon" onClick={onCloseModal} />
        </div>
        <div className="profile">
          <div className="flex-wrapper">
            <div className="avatar">
              <img src={profile?.avatar} alt="프사" />
            </div>
            <span>[Lv: {getLevel(profile?.exp!)}]</span>
            <span className="nickname">{profile?.nickname}</span>
          </div>
          <span className="createdAt">{relativeTime(drawing?.created_at!)}</span>
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: drawing?.content as string }} />

        <div className="info">
          <span className="view">
            <AiOutlineEye /> {drawing?.views}
          </span>
          <span className="like" onClick={onAddLike}>
            {drawing?.likes?.find((like) => like.user_id === user?.id) ? <AiFillLike /> : <AiOutlineLike />}
            {drawing?.likes?.length}
          </span>
          <span className="dislike" onClick={onAddDisLike}>
            {drawing?.dislikes?.find((dislike) => dislike.user_id === user?.id) ? (
              <AiFillDislike />
            ) : (
              <AiOutlineDislike />
            )}
            {drawing?.dislikes?.length}
          </span>
        </div>

        <div className="comment">
          <span>댓글 {drawing?.comments?.length}</span>
          <div className="textarea-background">
            <textarea
              placeholder="댓글을 입력하세요.."
              cols={20}
              rows={3}
              wrap="hard"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={onAddComment}>등록</button>
          </div>

          <ul>
            {drawing?.comments!.slice(0, visible).map((comment) => (
              <li key={comment.id}>
                <div className="profile">
                  <div className="flex-wrapper">
                    <div className="avatar">
                      <img src={comment.user?.avatar} alt="프사" />
                    </div>
                    <span>[Lv: {getLevel(comment.user?.exp)}]</span>
                    <span className="nickname">{comment.user?.nickname}</span>
                  </div>
                  <span className="createdAt">{relativeTime(comment?.created_at!)}</span>
                </div>
                <pre>{comment.comment}</pre>
              </li>
            ))}
            {(drawing?.comments!.length as number) < visible ? null : (
              <button onClick={onCommentMore}>댓글 더보기</button>
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1003;
  display: flex;
  align-items: center;

  .left {
    width: 100%;
    text-align: center;
    .image {
      max-width: 100%;
    }
    .icon {
      font-size: 5rem;
      color: ${({ theme }) => theme.palette.white};
    }
  }

  .right {
    background-color: ${({ theme }) => theme.palette.white};
    width: 45rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
      p {
        font-size: 2rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .close-icon {
        align-self: flex-end;
        font-size: 2.5rem;
        color: ${({ theme }) => theme.palette.black};
        cursor: pointer;
      }
    }
    .profile {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .flex-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .avatar {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid ${({ theme }) => theme.palette.black};
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      span {
        font-size: 1.5rem;
      }
      .nickname {
        font-weight: 600;
      }
      .createdAt {
        font-size: 1rem;
      }
    }

    .content {
      font-size: 1.5rem;
    }

    .info {
      font-size: 1.6rem;
      display: flex;
      justify-content: space-around;
      border-top: 1px solid ${({ theme }) => theme.palette.gray};
      border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
      padding: 0.5rem 0;
      .like {
        cursor: pointer;
      }
      .dislike {
        cursor: pointer;
      }
      .active {
        color: ${({ theme }) => theme.palette.green};
      }
    }
    .comment {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      span {
        font-size: 2rem;
      }
      .textarea-background {
        background-color: ${({ theme }) => theme.palette.gray};
        padding: 1rem 0.5rem 4rem;
        position: relative;
        textarea {
          width: 100%;
          min-height: 10rem;
          resize: none;
          outline: none;
          border: 2px solid ${({ theme }) => theme.palette.gray};
        }
        button {
          position: absolute;
          padding: 0.5rem 1rem;
          bottom: 0.7rem;
          right: 1rem;
          ${greenButtonStyle};
        }
      }

      ul {
        overflow-y: scroll;
        height: calc(100vh - 35.5rem);
        li {
          border-bottom: 1px solid ${({ theme }) => theme.palette.black};
          margin-bottom: 0.5rem;
          .profile {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .flex-wrapper {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            .avatar {
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
              overflow: hidden;
              border: 1px solid ${({ theme }) => theme.palette.black};
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            span {
              font-size: 1.5rem;
            }
            .nickname {
              font-weight: 600;
            }
            .createdAt {
              font-size: 1rem;
            }
          }

          pre {
            font-size: 1.2rem;
            padding: 1rem;
          }
        }
        button {
          width: 100%;
          outline: none;
          border: 0;
          cursor: pointer;
          padding: 0.5rem 0;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    height: 100vh;
    overflow-y: scroll;
    flex-direction: column;
    .left {
      .image {
        p {
          font-size: 1.5rem;
        }
      }
    }
    .right {
      width: 100%;
    }
  }
`;

export default ShowDrawingModal;
