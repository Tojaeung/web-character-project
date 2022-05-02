import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import ImageSide from '@src/components/modals/drawing/ImageSide';
import Info from '@src/components/modals/drawing/Info';
import Comment from '@src/components/comment';
import CommentForm from '@src/components/CommentForm';
import { useAppSelector } from '@src/store/app/hook';
import { selectDrawingDrawings, selectDrawingIndex } from '@src/store/slices/drawing.slice';
import { closeModal } from '@src/store/slices/modal.slice';

function DrawingModal() {
  const drawings = useAppSelector(selectDrawingDrawings);
  const index = useAppSelector(selectDrawingIndex);

  return (
    <Container>
      <ImageSide />
      <InfoSide>
        <IconBox onClick={closeModal}>
          <CloseIcon />
        </IconBox>

        <Info />

        <CommentForm entityId={drawings[index!]?.id!} type="drawing" />
        <Comment comments={drawings[index!]?.comments!} type="drawing" />
      </InfoSide>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1003;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const InfoSide = styled.div`
  width: 50rem;
  height: 100vh;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.palette.white};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  z-index: 1035;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;
const IconBox = styled.div`
  background-color: ${({ theme }) => theme.palette.gray};
  padding: 0.5rem;
  border-radius: 50%;
  position: absolute;
  top: 1rem;
  left: 1rem;
`;
const CloseIcon = styled(AiOutlineClose)`
  color: black;
  font-size: 2.5rem;
  cursor: pointer;
`;

export default DrawingModal;
