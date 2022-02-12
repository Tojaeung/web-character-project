import { Container } from './RegisterGuide.styled';
import { AiOutlineClose } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
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

export default RegisterGuide;
