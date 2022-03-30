import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import ImageSide from '@src/components/modals/profile/ShowDrawing.modal/ImageSide';
import Info from '@src/components/modals/profile/ShowDrawing.modal/Info';
import Comment from '@src/components/modals/profile/ShowDrawing.modal/DrawingComment';
import CommentForm from '@src/components/common/CommentForm';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectDrawingDrawings, selectDrawingIndex } from '@src/store/slices/drawing.slice';
import { closeModal } from '@src/store/slices/modal.slice';

function ShowDrawingModal() {
  const dispatch = useAppDispatch();
  const drawings = useAppSelector(selectDrawingDrawings);
  const selectedIndex = useAppSelector(selectDrawingIndex);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const onCloseModal = async (e: React.MouseEvent<SVGElement>) => {
    document.body.style.overflow = 'unset';
    await dispatch(closeModal());
  };

  return (
    <Container>
      <ImageSide />
      <div className="infoSide">
        <div className="header">
          <p>제목: {drawings[selectedIndex!]?.title}</p>
          <AiOutlineClose className="close-icon" onClick={onCloseModal} />
        </div>
        <Info />
        <CommentForm
          id={drawings[selectedIndex!]?.id}
          comments={drawings[selectedIndex!]?.drawingComments!}
          category="drawing"
        />
        <Comment />
      </div>
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

  .infoSide {
    width: 50rem;
    background-color: ${({ theme }) => theme.palette.white};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
      p {
        font-size: 1.7rem;
        font-weight: 700;
      }
      .close-icon {
        font-size: 2.5rem;
        cursor: pointer;
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    height: 100vh;
    overflow-y: scroll;
    flex-direction: column;
  }
`;

export default ShowDrawingModal;
