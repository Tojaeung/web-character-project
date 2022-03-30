import styled, { css } from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '@src/store/app/hook';
import { closeModal } from '@src/store/slices/modal.slice';
interface IProps {
  width: number; // 모달창 너비
  height?: number; // 모달창 높이
  children: React.ReactNode; // 자식컴포넌트
}

function ModalContainer({ width, height, children }: IProps) {
  const dispatch = useAppDispatch();

  const CloseModal = async (e: any) => {
    await dispatch(closeModal());
  };

  return (
    <Container width={width} height={height}>
      <CloseIcon onClick={CloseModal} />
      {children}
    </Container>
  );
}

const Container = styled.div<{ width: number; height?: number }>`
  width: ${({ width }) => `${width}rem`};
  max-width: ${({ width }) => `${width}rem`}; // 최대길이를 설정하여 너비 안넓어지게 방지
  height: ${({ height }) => `${height}rem`};
  border-radius: 5px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 1000;

  @media ${({ theme }) => theme.device.laptop} {
    ${({ width }) => {
      // 너비가 103rem 보다 작은순간 반응형으로 만들어준다.
      if (width < 103) {
        return css`
          width: 90%;
        `;
      }
    }}
  }
  @media ${({ theme }) => theme.device.tablet} {
    ${({ width }) => {
      if (width < 77) {
        // 너비가 77rem 보다 작은순간 반응형으로 만들어준다.
        return css`
          width: 90%;
        `;
      }
    }}
  }
  @media ${({ theme }) => theme.device.mobile} {
    ${({ width }) => {
      if (width < 44) {
        // 너비가 44rem 보다 작은순간 반응형으로 만들어준다.
        return css`
          width: 90%;
        `;
      }
    }}
  }
`;
const CloseIcon = styled(AiOutlineClose)`
  cursor: pointer;
  align-self: flex-end;
  font-size: 2.5rem;
`;

export default ModalContainer;
