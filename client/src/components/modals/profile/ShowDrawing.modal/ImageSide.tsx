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
  const onPrevDrawing = async (e: any) => {
    const selectedDrawingIndex = getSelectedDrawingIndex();
    if (selectedDrawingIndex - 1 < 0) {
      await dispatch(selectDrawing({ index: 0 }));
      return;
    }
    await dispatch(selectDrawing({ index: selectedDrawingIndex - 1 }));
    await dispatch(addView({ drawingId: selectedDrawing!.id }));
  };

  // 다음 그림
  const onNextDrawing = async (e: any) => {
    const selectedDrawingIndex = getSelectedDrawingIndex();
    if (selectedDrawingIndex + 1 === drawings.length) {
      await dispatch(selectDrawing({ index: drawings.length - 1 }));
      return;
    }

    await dispatch(selectDrawing({ index: selectedDrawingIndex + 1 }));
    await dispatch(addView({ drawingId: selectedDrawing!.id }));
  };

  return (
    <Container>
      <PrevIcon selectedIndex={getSelectedDrawingIndex()} onClick={onPrevDrawing} />

      <Image src={selectedDrawing?.url} alt="이미지" />

      <NextIcon selectedIndex={getSelectedDrawingIndex()} drawingsLength={drawings.length} onClick={onNextDrawing} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  @media ${({ theme }) => theme.device.mobile} {
    max-height: 30rem;
    justify-content: center;
  }
`;

const PrevIcon = styled(AiOutlineLeft)<{ selectedIndex: number | null }>`
  font-size: 7rem;
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.palette.white};
  display: ${({ selectedIndex }) => (selectedIndex === 0 ? 'none' : 'block')};
  cursor: pointer;
  &:hover {
    opacity: ${({ selectedIndex }) => (selectedIndex === 0 ? 0 : 0.7)};
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 5rem;
  }
`;
const NextIcon = styled(AiOutlineRight)<{ selectedIndex: number | null; drawingsLength: number | null }>`
  font-size: 7rem;
  position: absolute;
  left: 95%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.palette.white};
  display: ${({ selectedIndex, drawingsLength }) => (selectedIndex! + 1 === drawingsLength ? 'none' : 'block')};
  cursor: pointer;
  &:hover {
    opacity: ${({ selectedIndex, drawingsLength }) => (selectedIndex! + 1 === drawingsLength ? 0 : 0.7)};
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 5rem;
  }
`;

const Image = styled.img`
  object-fit: contain;
  height: 100vh;
  @media ${({ theme }) => theme.device.mobile} {
    max-height: 30rem;
  }
`;

export default ImageSide;
