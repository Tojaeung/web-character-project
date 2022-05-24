import { MdMarkEmailRead } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { greenButtonStyle } from 'styles/button.style';
import { closeModal } from 'store/slices/modal.slice';
import { useAppDispatch } from 'store/app/hook';

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

      <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
    </Container>
  );
}

const Container = styled.div`
  width: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  media ${({ theme }) => theme.device.mobile} {
    width: 25rem;
  }
`;
const Title = styled.h1`
  align-self: flex-start;
  font-size: 2rem;
  font-weight: 700;
  media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
  }
`;
const EmailIcon = styled(MdMarkEmailRead)`
  font-size: 12rem;
  color: ${({ theme }) => theme.palette.green};
  media ${({ theme }) => theme.device.mobile} {
    font-size: 7rem;
  }
`;
const Content = styled.p`
  font-size: 1.5rem;
  media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;
const ConfirmButton = styled.button`
  ${greenButtonStyle};
  width: 50%;
  padding: 1rem 0;
  font-size: 1.5rem;
  media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
    padding: 0.5rem 0;
  }
`;

export default SignUpGuide;
