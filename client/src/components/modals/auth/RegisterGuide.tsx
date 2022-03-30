import { MdMarkEmailRead } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ModalContainer from '@src/components/modals/ModalContainer';
import { useAppDispatch } from '@src/store/app/hook';
import { closeModal } from '@src/store/slices/modal.slice';
import StyledButton from '@src/styles/StyledButton';

function RegisterGuide() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClose = async (e: any) => {
    await dispatch(closeModal());
    navigate('/');
  };

  return (
    <ModalContainer width={40}>
      <Container>
        <Title>가입완료</Title>
        <EmailIcon />
        <Content>
          가입하신 이메일로 <i>"인증메일"</i>을 보내드렸습니다.📫
        </Content>

        <ConfirmButton color="green" size="medium" responsive={true} onClick={onClose}>
          확인
        </ConfirmButton>
      </Container>
    </ModalContainer>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const Title = styled.h1`
  align-self: flex-start;
`;
const EmailIcon = styled(MdMarkEmailRead)`
  font-size: 12rem;
  color: ${({ theme }) => theme.palette.green};
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 10rem;
  }
`;
const Content = styled.p`
  font-size: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.3rem;
  }
`;
const ConfirmButton = styled(StyledButton)``;

export default RegisterGuide;
