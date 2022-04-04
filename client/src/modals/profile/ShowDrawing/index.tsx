import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import ImageSide from '@src/modals/profile/ShowDrawing/ImageSide';
import Info from '@src/modals/profile/ShowDrawing/Info';
import Comment from '@src/components/comment';
import CommentForm from '@src/components/CommentForm';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { closeModal } from '@src/store/slices/modal.slice';
import { selectDrawingDrawings, selectDrawingIndex } from '@src/store/slices/drawing.slice';

function ShowDrawingModal() {
  const dispatch = useAppDispatch();
  const drawings = useAppSelector(selectDrawingDrawings);
  const index = useAppSelector(selectDrawingIndex);

  return (
    <Container>
      <ImageSide />
      <InfoSide>
        <Header>
          <Title>제목: {drawings[index!]?.title}</Title>
          <CloseIcon onClick={(e) => dispatch(closeModal())} />
        </Header>

        <Info />

        <CommentForm id={drawings[index!]?.id!} comments={drawings[index!]?.drawingComments!} type="drawing" />
        <Comment comments={drawings[index!]?.drawingComments!} type="drawing" />
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
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
`;
const Title = styled.h2``;
const CloseIcon = styled(AiOutlineClose)`
  font-size: 2.5rem;
  cursor: pointer;
`;

export default ShowDrawingModal;
