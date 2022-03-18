import styled from 'styled-components';
import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '@src/redux/slices/modal.slice';
import { useAppDispatch } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { selectProfileProfile } from '@src/redux/slices/profile.slice';
import { useAppSelector } from '@src/redux/app/hook';

function ShowDescModal() {
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
      <div className="wrapper">
        <AiOutlineClose className="closeBtn" onClick={onClose} />
        <div className="title">자기소개</div>
        <div className="desc" dangerouslySetInnerHTML={{ __html: profile?.desc as string }} />

        {user?.id === profile?.id && (
          <div className="btn-wrapper">
            <button
              className="modifyBtn"
              onClick={(e) => {
                navigate('/settings');
                onClose(e);
              }}
            >
              수정
            </button>
            <button className="cancelBtn" onClick={onClose}>
              취소
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 50rem;
  border-radius: 10px;
  padding: 2rem;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: ${({ theme }) => theme.palette.white};
  .closeBtn {
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
    align-self: flex-end;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
  }
  .title {
    font-size: 3rem;
    font-weight: 700;
    align-self: flex-start;
  }
  .desc {
    padding: 2rem;
    font-size: 1.5rem;
    align-self: flex-start;
  }
  .modifyBtn {
    ${greenButtonStyle};
    font-size: 1.5rem;
    padding: 1rem 2rem;
    margin-right: 1rem;
  }
  .cancelBtn {
    ${redButtonStyle};
    font-size: 1.5rem;
    padding: 1rem 2rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 30rem;
    .title {
      font-size: 2rem;
    }

    .desc {
      font-size: 1.5rem;
    }

    .modifyBtn {
      font-size: 1.2rem;
    }
    .cancelBtn {
      font-size: 1.2rem;
    }
  }
`;

export default ShowDescModal;
