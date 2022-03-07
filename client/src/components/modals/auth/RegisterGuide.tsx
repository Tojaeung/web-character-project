import { AiOutlineClose } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { greenButtonStyle } from '@src/styles/GlobalStyles';
import { useAppDispatch } from '@src/redux/app/hook';
import { closeModal } from '@src/redux/slices/modal.slice';

function RegisterGuide() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClose = async (e: any) => {
    await dispatch(closeModal());
    navigate('/');
  };

  return (
    <Container>
      <AiOutlineClose className="closeBtn" onClick={onClose} />
      <MdMarkEmailRead className="icon" />
      <div className="content">
        가입하신 이메일로 <span className="content-text">"인증메일"</span>을 보내드렸습니다.📫
      </div>

      <button className="confirmBtn" onClick={onClose}>
        확인
      </button>
    </Container>
  );
}

const Container = styled.div`
  width: 40rem;
  border-radius: 10px;
  padding: 1rem;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: ${({ theme }) => theme.palette.white};
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  .closeBtn {
    align-self: flex-end;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
  }
  .icon {
    font-size: 8rem;
    color: ${({ theme }) => theme.palette.green};
  }
  .content {
    font-size: 1.5rem;
  }
  .content-text {
    font-weight: 700;
  }

  .confirmBtn {
    width: 50%;
    font-size: 1.7rem;
    cursor: pointer;
    padding: 1rem;
    margin: 1rem 0;

    ${greenButtonStyle};
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 30rem;
    .content {
      font-size: 1.5rem;
    }
    .confirmBtn {
      font-size: 1.2rem;
      padding: 1rem;
    }
  }
`;

export default RegisterGuide;
