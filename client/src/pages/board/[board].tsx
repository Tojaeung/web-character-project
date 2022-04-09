import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { BsPencilSquare } from 'react-icons/bs';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import { getBoard } from '@src/store/requests/board.request';
import { selectBoardSelectedBoard } from '@src/store/slices/board.slice';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import Nickname from '@src/components/Nickname';
import Pagination from './Pagination';
import boardTitle from '@src/utils/boardTitle.util';
import LimitSelector from './LimitSelector';
import CreatedTime from '@src/components/CreatedTime';
import Button from '@src/components/Button';

function Board() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { board } = useParams();

  const selectedBoard = useAppSelector(selectBoardSelectedBoard);

  const [totalPostsNum, setTotalPostsNum] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);

  // 게시글 데이터 가져오기
  useEffect(() => {
    dispatch(
      getBoard({
        board: board as string,
        page,
        limit,
      })
    )
      .unwrap()
      .then((res) => setTotalPostsNum(res.totalPostsNum));
  }, [page, limit]);

  const goTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <Container>
        <Header>
          <BoardName>{boardTitle(board as string)}</BoardName>
          <LimitSelector setPage={setPage} limit={limit} setLimit={setLimit} />
        </Header>
        <Table>
          <tr>
            <th>번호</th>
            <th className="title">제목</th>
            <th>닉네임</th>
            <th>조회수</th>
            <th>날짜</th>
          </tr>

          {selectedBoard &&
            selectedBoard.map((post) => (
              <tr key={v4()}>
                <td>{post.id}</td>
                <td className="post-title">
                  <Link to={`/board/${board}/post/${post.id}`}>{post.title}</Link>
                </td>
                <td>
                  <Nickname exp={post.user.exp} nickname={post.user.nickname} size="small" />
                </td>
                <td>{post.views}</td>
                <td>
                  <CreatedTime createdTime={post.created_at} size="small" />
                </td>
              </tr>
            ))}
        </Table>

        <Footer>
          <Pagination total={totalPostsNum} page={page} setPage={setPage} limit={Number(limit)} />
          <ScrollUpButton color="green" size="small" inverse={true} onClick={goTop}>
            상단으로
          </ScrollUpButton>
          <CreatePostButton color="green" size="small" onClick={(e) => navigate(`/create/postForm/${board}`)}>
            글쓰기
          </CreatePostButton>
        </Footer>
      </Container>

      <Responsive>
        <Header>
          <BoardName>{boardTitle(board as string)}</BoardName>
          <LimitSelector setPage={setPage} limit={limit} setLimit={setLimit} />
        </Header>
        <Table>
          {selectedBoard &&
            selectedBoard.map((post) => (
              <ListBox key={v4()}>
                <PostLink to={`/board/${board}/post/${post.id}`}>{post.title}</PostLink>

                <DetailBox>
                  <Nickname exp={post.user.exp} nickname={post.user.nickname} size="small" />

                  <Views>조회수: {post.views}</Views>

                  <CreatedTime createdTime={post.created_at} size="small" />
                </DetailBox>
              </ListBox>
            ))}
        </Table>

        <Footer>
          <Pagination total={totalPostsNum} page={page} setPage={setPage} limit={Number(limit)} />
          <ScrollUpButton color="green" size="small" onClick={goTop}>
            <ScrollUpIcon />
          </ScrollUpButton>
          <CreatePostButton color="green" size="small" onClick={(e) => navigate(`/create/postForm/${board}`)}>
            <CreatePostIcon />
          </CreatePostButton>
        </Footer>
      </Responsive>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  @media ${({ theme }) => theme.device.tablet} {
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
  }
`;
const BoardName = styled.span`
  font-size: 2rem;
`;

const Table = styled.table`
  width: 100%;
  position: relative;
  tr {
    text-align: center;
    th {
      font-size: 1.4rem;
      font-weight: bold;
      padding: 1rem;
      background-color: ${({ theme }) => theme.palette.gray};
      white-space: nowrap;
    }
    td {
      border: 1px solid ${({ theme }) => theme.palette.gray};
      padding: 1rem;
    }
    .title {
      width: 70%;
    }
    .post-title {
      text-align: left;
      padding: 0 0 0 2rem;
      word-break: break-all;
    }
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

const ScrollUpButton = styled(Button)`
  position: absolute;
  bottom: 0.7rem;
  right: 7rem;
  padding: 0.7rem;
  @media ${({ theme }) => theme.device.tablet} {
    position: fixed;
    bottom: 10rem;
    right: 2rem;
    padding: 0.7rem;
  }
`;

const CreatePostButton = styled(Button)`
  position: absolute;
  bottom: 0.7rem;
  right: 1rem;
  padding: 0.7rem;
  @media ${({ theme }) => theme.device.tablet} {
    position: fixed;
    bottom: 6rem;
    right: 2rem;
  }
`;

const Responsive = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    display: block;
  }
`;

const ListBox = styled.tr`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  border-bottom: 1px dotted;
`;

const PostLink = styled(Link)`
  text-align: left;
  align-self: flex-start;
  font-size: 1.3rem;
  word-break: break-all;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;
const Views = styled.span``;
const DetailBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ScrollUpIcon = styled(HiOutlineChevronDoubleUp)`
  font-size: 2rem;
`;

const CreatePostIcon = styled(BsPencilSquare)`
  font-size: 2rem;
  color: ${({ theme }) => theme.palette.white};
`;

export default Board;
