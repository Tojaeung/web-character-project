import React from 'react';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectIndex, selectDrawingIndex, selectDrawingDrawings } from '@src/store/slices/drawing.slice';
import { addView } from '@src/store/requests/drawing.request';

function ImageSide() {
  const dispatch = useAppDispatch();

  const drawings = useAppSelector(selectDrawingDrawings);
  const selectedIndex = useAppSelector(selectDrawingIndex);

  // 이전 그림
  const onPrevDrawing = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedIndex! - 1 < 0) {
      await dispatch(selectIndex({ index: 0 }));
      // await dispatch(addView({ drawingId: drawings[selectedIndex!].id }));
      return;
    }
    await dispatch(selectIndex({ index: selectedIndex! - 1 }));
    await dispatch(addView({ drawingId: drawings[selectedIndex!].id }));
  };

  // 다음 그림
  const onNextDrawing = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedIndex! + 1 === drawings.length) {
      await dispatch(selectIndex({ index: drawings.length - 1 }));
      // await dispatch(addView({ drawingId: drawings[selectedIndex!].id }));
      return;
    }

    await dispatch(selectIndex({ index: selectedIndex! + 1 }));
    await dispatch(addView({ drawingId: drawings[selectedIndex!].id }));
  };

  return (
    <Container selectedIndex={selectedIndex} drawingsLength={drawings.length}>
      <div className="prev" onClick={onPrevDrawing}>
        <AiOutlineLeft className="prev-icon" />
      </div>

      <div className="image">
        <img src={drawings[selectedIndex!]?.url} alt="이미지" />
      </div>

      <div className="next" onClick={onNextDrawing}>
        <AiOutlineRight className="next-icon" />
      </div>
    </Container>
  );
}

const Container = styled.div<{ selectedIndex: number | null; drawingsLength: number | null }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .prev {
    width: 10rem;
    height: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${(props) => (props.selectedIndex === 0 ? 0 : 1)};
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray};
    }
    .prev-icon {
      font-size: 5rem;
      color: ${({ theme }) => theme.palette.white};
    }
  }

  .image {
    max-width: 100%;
  }
  .next {
    width: 10rem;
    height: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${(props) => (props.selectedIndex! + 1 === props.drawingsLength ? 0 : 1)};
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray};
    }
    .next-icon {
      font-size: 5rem;
      color: ${({ theme }) => theme.palette.white};
    }
  }
`;

export default ImageSide;