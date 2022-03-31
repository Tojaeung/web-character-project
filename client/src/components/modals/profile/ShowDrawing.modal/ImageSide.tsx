import React from 'react';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectDrawing, selectDrawingDrawings, selectDrawingSelectedDrawing } from '@src/store/slices/drawing.slice';
import { addView } from '@src/store/requests/drawing.request';

function ImageSide() {
  const dispatch = useAppDispatch();
  const drawings = useAppSelector(selectDrawingDrawings);
  const selectedDrawing = useAppSelector(selectDrawingSelectedDrawing);

  // 햔제 선택된 그림의 인덱스를 구하는 함수
  const getSelectedDrawingIndex = () => {
    const index = drawings.findIndex((drawing) => drawing.id === selectedDrawing?.id);
    return index;
  };

  // 이전 그림
  const onPrevDrawing = async (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedDrawingIndex = getSelectedDrawingIndex();
    if (selectedDrawingIndex - 1 < 0) {
      await dispatch(selectDrawing({ index: 0 }));
      return;
    }
    await dispatch(selectDrawing({ index: selectedDrawingIndex - 1 }));
    await dispatch(addView({ drawingId: selectedDrawing!.id }));
  };

  // 다음 그림
  const onNextDrawing = async (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedDrawingIndex = getSelectedDrawingIndex();
    if (selectedDrawingIndex + 1 === drawings.length) {
      await dispatch(selectDrawing({ index: drawings.length - 1 }));
      // await dispatch(addView({ drawingId: drawings[selectedIndex!].id }));
      return;
    }

    await dispatch(selectDrawing({ index: selectedDrawingIndex + 1 }));
    await dispatch(addView({ drawingId: selectedDrawing!.id }));
  };

  return (
    <Container>
      <Prev selectedIndex={getSelectedDrawingIndex()} onClick={onPrevDrawing}>
        <PrevIcon />
      </Prev>

      <Image src={selectedDrawing?.url} alt="이미지" />

      <Next selectedIndex={getSelectedDrawingIndex()} drawingsLength={drawings.length} onClick={onNextDrawing}>
        <NextIcon />
      </Next>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Prev = styled.div<{ selectedIndex: number | null }>`
  width: 10rem;
  height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.selectedIndex === 0 ? 0 : 1)};
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray};
  }
`;
const Next = styled.div<{ selectedIndex: number | null; drawingsLength: number | null }>`
  width: 10rem;
  height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.selectedIndex! + 1 === props.drawingsLength ? 0 : 1)};
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray};
  }
`;
const PrevIcon = styled(AiOutlineLeft)`
  font-size: 5rem;
  color: ${({ theme }) => theme.palette.white};
`;
const NextIcon = styled(AiOutlineRight)`
  font-size: 5rem;
  color: ${({ theme }) => theme.palette.white};
`;
const Image = styled.img``;

export default ImageSide;
