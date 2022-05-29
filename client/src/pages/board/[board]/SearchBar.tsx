import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { greenInputStyle } from 'styles/input.style';
import { greenButtonStyle } from 'styles/button.style';

interface IProps {
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ limit, setPage, searchType, keyword, setSearchType, setKeyword }: IProps) {
  const navigate = useNavigate();
  const { board } = useParams();

  const selectSearchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (keyword === '') return alert('검색어를 입력해주세요.');
    setPage(1);
    navigate(`/${board}?page=1&limit=${limit}&searchType=${searchType}&keyword=${keyword}`);
  };

  // 엔터클릭시 submit 된다.
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') handleSubmit(e);
  };

  return (
    <Container>
      <Select name="searchSelector" value={searchType} onChange={selectSearchType}>
        <Option value={'title'}>제목</Option>
        <Option value={'content'}>내용</Option>
        <Option value={'nickname'}>작성자</Option>
      </Select>
      <Input
        placeholder="검색어를 입력하세요."
        value={keyword}
        onKeyPress={handleKeyPress}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SubmitButton onClick={handleSubmit}>검색</SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  @media ${({ theme }) => theme.device.mobile} {
    gap: 0.5rem;
  }
`;
const Select = styled.select`
  font-size: 1.4rem;
  height: 4rem;

  @media ${({ theme }) => theme.device.mobile} {
    width: 6rem;
    height: 3rem;
    font-size: 1.2rem;
  }
`;
const Option = styled.option``;
const Input = styled.input`
  ${greenInputStyle};
  width: 20rem !important;
  @media ${({ theme }) => theme.device.mobile} {
    width: 50% !important;
    min-height: 3.5rem !important;
  }
`;
const SubmitButton = styled.button`
  ${greenButtonStyle};
  padding: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.7rem;
  }
`;

export default SearchBar;
