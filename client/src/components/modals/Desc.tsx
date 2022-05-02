import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@src/components/Button';
import { useAppSelector } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';
import { closeModal } from '@src/store/slices/modal.slice';

interface IProp {
  props: { userId: number; desc: string };
}

function Desc({ props }: IProp) {
  const navigate = useNavigate();

  const user = useAppSelector(selectUserUser);

  return (
    <Container>
      <Title>자기소개🌟</Title>
      <Content dangerouslySetInnerHTML={{ __html: props.desc as string }} />

      {user?.id === props.userId && (
        <ModifyButton
          color="green"
          size="medium"
          onClick={(e) => {
            navigate('/settings/desc');
            closeModal();
          }}
        >
          수정
        </ModifyButton>
      )}
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1`
  align-self: flex-start;
  font-size: 2rem;
  font-weight: bold;
`;

const Content = styled.p`
  align-self: flex-start;
  padding: 1rem;
`;
const ModifyButton = styled(Button)``;
export default Desc;
