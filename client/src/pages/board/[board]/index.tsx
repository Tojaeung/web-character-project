import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation, NavLink, useSearchParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { BsPencilSquare } from 'react-icons/bs';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import { useAppDispatch } from 'store/app/hook';
import Nickname from 'components/Nickname';
import { getBoard } from 'store/requests/board.request';
import Pagination from './Pagination';
import LimitSelector from './LimitSelector';
import SearchBar from './SearchBar';
import CreatedTime from 'components/CreatedTime';
import { greenButtonStyle, inverseGreenButtonStyle } from 'styles/button.style';
import boardName from 'utils/boardName.util';
import { PostType } from 'interfaces/index';

function Board() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { board } = useParams();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [totalPostsNum, setTotalPostsNum] = useState<number>(0);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [limit, setLimit] = useState<number>(Number(searchParams.get('limit')) || 10);

  const [searchType, setSearchType] = useState(searchParams.get('searchType') || 'title');
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  // 게시글 데이터 가져오기
  useEffect(() => {
    dispatch(
      getBoard({
        board: board as string,
        queryString: location.search,
      })
    )
      .unwrap()
      .then((res) => {
        const { posts, totalPostsNum } = res;
        setPosts(posts);
        setTotalPostsNum(totalPostsNum);
      })
      .catch((err: any) => alert(err.message));
  }, [dispatch, location.search, board]);

  // 스크롤 맨위로
  const goTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <Container>
        <Header>
          <BoardName>{boardName(board as string)}</BoardName>
          <LimitSelector
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            searchType={searchType}
            keyword={keyword}
          />
        </Header>

        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th className="title">제목</th>
              <th>닉네임</th>
              <th>조회수</th>
              <th>날짜</th>
            </tr>
          </thead>

          <tbody>
            {!posts.length ? (
              <tr>
                <td colSpan={5}>결과가 없습니다...</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={v4()}>
                  <td>{post.id}</td>
                  <td className="post-title">
                    <PostLink to={`/${board}/${post.id}${location.search}`}>{post.title}</PostLink>
                  </td>
                  <td>
                    <Nickname user={post?.user!} fontSize={1.3} />
                  </td>
                  <td>{post.views}</td>
                  <td>
                    <CreatedTime createdTime={post.created_at} fontSize={1.2} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Footer>
          <ScrollUpButton onClick={goTop}>상단으로</ScrollUpButton>
          <Pagination
            total={totalPostsNum}
            page={page}
            setPage={setPage}
            limit={limit}
            searchType={searchType}
            keyword={keyword}
          />
          <CreatePostButton onClick={(e) => navigate(`/create/postForm/${board}`)}>글쓰기</CreatePostButton>
        </Footer>

        <SearchBar
          limit={limit}
          setPage={setPage}
          searchType={searchType}
          setSearchType={setSearchType}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      </Container>

      <Responsive>
        <Header>
          <BoardName>{boardName(board as string)}</BoardName>
          <LimitSelector
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            searchType={searchType}
            keyword={keyword}
          />
        </Header>

        {!posts.length ? (
          <NoResultText>결과가 없습니다.</NoResultText>
        ) : (
          posts.map((post) => (
            <ListBox key={v4()}>
              <Title>
                <PostLink to={`/${board}/${post.id}`}>{post.title}</PostLink>
              </Title>

              <DetailBox>
                <Nickname user={post?.user!} fontSize={1.3} />|<Views>조회수: {post.views}</Views>
                |
                <CreatedTime createdTime={post.created_at} fontSize={1.2} />
              </DetailBox>
            </ListBox>
          ))
        )}

        <Footer>
          <Pagination
            total={totalPostsNum}
            page={page}
            setPage={setPage}
            limit={limit}
            searchType={searchType}
            keyword={keyword}
          />
          <ScrollUpButton onClick={goTop}>
            <ScrollUpIcon />
          </ScrollUpButton>
          <CreatePostButton onClick={(e) => navigate(`/create/postForm/${board}`)}>
            <CreatePostIcon />
          </CreatePostButton>
        </Footer>

        <SearchBar
          limit={limit}
          setPage={setPage}
          searchType={searchType}
          setSearchType={setSearchType}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      </Responsive>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.palette.bgColor};
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }

  table {
    width: 100%;
    position: relative;
    tr {
      text-align: center;
      th {
        font-size: 1.5rem;
        font-weight: bold;
        padding: 1rem;
        border: 1px solid ${({ theme }) => theme.palette.black};
        background-color: ${({ theme }) => theme.palette.gray};
        white-space: nowrap;
      }
      td {
        border: 1px solid ${({ theme }) => theme.palette.gray};
        padding: 1rem;
        font-size: 1.3rem;
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
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  @media ${({ theme }) => theme.device.tablet} {
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
  }
`;
const BoardName = styled.span`
  font-size: 2rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${({ theme }) => theme.device.tablet} {
    justify-content: center;
  }
`;

const ScrollUpButton = styled.button`
  ${greenButtonStyle};
  padding: 0.7rem;
  @media ${({ theme }) => theme.device.tablet} {
    position: fixed;
    bottom: 10rem;
    right: 2rem;
    padding: 0.7rem;
  }
`;

const CreatePostButton = styled.button`
  ${inverseGreenButtonStyle};
  padding: 0.7rem;
  @media ${({ theme }) => theme.device.tablet} {
    ${greenButtonStyle};
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
    padding: 0 1rem;
    background-color: ${({ theme }) => theme.palette.bgColor};
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    display: block;
    padding: 0 0.5rem;
    background-color: ${({ theme }) => theme.palette.bgColor};
  }
`;
const NoResultText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem 0;
`;
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  border-bottom: 1px dotted;
`;

const Title = styled.div`
  text-align: left;
  align-self: flex-start;
  font-size: 1.3rem;
  word-break: break-all;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;
const PostLink = styled(NavLink)`
  &:hover {
    text-decoration: underline;
  }
  &:link {
    color: black;
  }
  &:visited {
    color: blue;
  }
  &.active {
    background-color: yellow;
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
