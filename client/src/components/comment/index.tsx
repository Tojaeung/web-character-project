import { useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import CommentList from 'components/comment/CommentList';
import Pagination from './Pagination';
import { greenButtonStyle, inverseGreenButtonStyle } from 'styles/button.style';
import { DrawingCommentType, PostCommentType } from 'interfaces/index';

interface IProp {
  type: 'drawing' | 'board';
  comments: DrawingCommentType[] | PostCommentType[];
}

function Comment({ comments, type }: IProp) {
  const navigate = useNavigate();
  const { board } = useParams();

  const [page, setPage] = useState(1);
  const offset = (page - 1) * 20;

  // 댓글 수정하기 위한 선택된 댓글 인덱스
  const [commentIndex, setCommentIndex] = useState<number>();

  // 스크롤 맨위로
  const goTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      {!comments || !comments.length ? null : (
        <Container>
          <Header>
            <Topic>댓글</Topic>
            <CommentNum>{comments.length}</CommentNum>
          </Header>
          {comments!.slice(offset, offset + 20).map((comment, index) => (
            <CommentList
              key={v4()}
              type={type}
              comment={comment}
              index={index}
              setCommentIndex={setCommentIndex}
              isSelected={commentIndex === index ? true : false}
            />
          ))}
          <Footer>
            <Pagination total={comments!.length} page={page} setPage={setPage} />
            <ScrollUpButton onClick={goTop}>상단으로</ScrollUpButton>
            <CreatePostButton onClick={(e) => navigate(`/create/postForm/${board}`)}>글쓰기</CreatePostButton>
          </Footer>

          <ResponsiveFooter>
            <Pagination total={comments!.length} page={page} setPage={setPage} />
            <ScrollUpButton onClick={goTop}>
              <ScrollUpIcon />
            </ScrollUpButton>
            <CreatePostButton onClick={(e) => navigate(`/create/postForm/${board}`)}>
              <CreatePostIcon />
            </CreatePostButton>
          </ResponsiveFooter>
        </Container>
      )}
    </>
  );
}

const Container = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.gray};
  font-size: 1.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Topic = styled.span``;
const CommentNum = styled.span``;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
const ResponsiveFooter = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: center;
  }
`;
const ScrollUpButton = styled.button`
  ${greenButtonStyle};
  position: absolute;
  bottom: 0.7rem;
  right: 7rem;
  padding: 0.7rem;
  @media ${({ theme }) => theme.device.mobile} {
    position: fixed;
    bottom: 10rem;
    right: 2rem;
    padding: 0.7rem;
  }
`;

const CreatePostButton = styled.button`
  ${inverseGreenButtonStyle};
  position: absolute;
  bottom: 0.7rem;
  right: 1rem;
  padding: 0.7rem;
  @media ${({ theme }) => theme.device.mobile} {
    ${greenButtonStyle};
    position: fixed;
    bottom: 6rem;
    right: 2rem;
  }
`;

const ScrollUpIcon = styled(HiOutlineChevronDoubleUp)`
  font-size: 2rem;
`;

const CreatePostIcon = styled(BsPencilSquare)`
  font-size: 2rem;
  color: ${({ theme }) => theme.palette.white};
`;

export default Comment;
