import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { selectProfileProfile } from '@src/store/slices/profile.slice';
import { useAppSelector } from '@src/store/app/hook';
import Button from '@src/components/Button';

function ShowDesc() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectAuthUser);
  const profile = useAppSelector(selectProfileProfile);

  // 모달창 닫기
  const onClose = async (e: any) => {
    await dispatch(closeModal());
  };
  return (
    <Container>
      <Title>자기소개🌟</Title>

      <Content dangerouslySetInnerHTML={{ __html: profile?.desc as string }} />

      {user?.id === profile?.id && (
        <ModifyButton
          color="green"
          size="medium"
          onClick={(e) => {
            navigate('/settings/account');
            onClose(e);
          }}
        >
          수정
        </ModifyButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  align-self: flex-start;
`;
const Content = styled.p`
  align-self: flex-start;
  padding: 1rem;
`;
const ModifyButton = styled(Button)``;

export default ShowDesc;
