import { MdMarkEmailRead } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@src/components/Button';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';

function SignUpGuide() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleConfirm = async (e: any) => {
    await dispatch(closeModal());
    navigate('/');
  };

  return (
    <Container>
      <Title>가입완료</Title>
      <EmailIcon />
      <Content>
        가입하신 이메일로 <i>"인증메일"</i>을 보내드렸습니다.📫
      </Content>

      <ConfirmButton color="green" size="medium" onClick={handleConfirm}>
        확인
      </ConfirmButton>
    </Container>
  );
}

const Container = styled.div`
  width: 40rem;
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
const ConfirmButton = styled(Button)``;

export default SignUpGuide;
