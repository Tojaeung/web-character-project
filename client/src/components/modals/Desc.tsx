import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { greenButtonStyle } from 'styles/button.style';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { selectUserUser } from 'store/slices/user.slice';
import { closeModal } from 'store/slices/modal.slice';

interface IProp {
  props: { userId: number; desc: string } | null;
}

function Desc({ props }: IProp) {
  const { desc, userId } = props!;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUserUser);

  return (
    <Container>
      <Title>μκΈ°μκ°π</Title>
      <Content dangerouslySetInnerHTML={{ __html: desc as string }} />

      {user?.id === userId && (
        <ModifyButton
          onClick={(e) => {
            dispatch(closeModal());
            navigate('/settings/desc');
          }}
        >
          μμ 
        </ModifyButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media ${({ theme }) => theme.device.tablet} {
    width: 35rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 25rem;
  }
`;

const Title = styled.h1`
  align-self: flex-start;
  font-size: 2rem;
  font-weight: bold;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
  }
`;

const Content = styled.p`
  align-self: flex-start;
  font-size: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;
const ModifyButton = styled.button`
  ${greenButtonStyle};
  align-self: center;
  width: 5rem;
  padding: 1rem 0;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.8rem 0;
    font-size: 1.2rem;
  }
`;
export default Desc;
