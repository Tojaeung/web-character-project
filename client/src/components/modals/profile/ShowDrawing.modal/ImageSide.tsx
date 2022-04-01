import React from 'react';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectDrawing, selectDrawingDrawings, selectDrawingIndex } from '@src/store/slices/drawing.slice';
import { addView } from '@src/store/requests/drawing.request';

function ImageSide() {
  const dispatch = useAppDispatch();
  const drawings = useAppSelector(selectDrawingDrawings);
  const index = useAppSelector(selectDrawingIndex);

  // 이전 그림
  const onPrevDrawing = async (e: any) => {
    if (index! - 1 < 0) {
      await dispatch(selectDrawing({ selectedIndex: 0 }));
      return;
    }
    await dispatch(selectDrawing({ selectedIndex: index! - 1 }));
    await dispatch(addView({ drawingId: drawings[index!]!.id }));
  };

  // 다음 그림
  const onNextDrawing = async (e: any) => {
    if (index! + 1 === drawings.length) {
      await dispatch(selectDrawing({ selectedIndex: drawings.length - 1 }));
      return;
    }

    await dispatch(selectDrawing({ selectedIndex: index! + 1 }));
    await dispatch(addView({ drawingId: drawings[index!]!.id }));
  };

  return (
    <Container>
      <PrevIcon index={index} onClick={onPrevDrawing} />

      <Image src={drawings[index!]?.url} alt="이미지" />

      <NextIcon index={index} drawingsLength={drawings.length} onClick={onNextDrawing} />
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

const PrevIcon = styled(AiOutlineLeft)<{ index: number | null }>`
  font-size: 7rem;
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.palette.white};
  display: ${({ index }) => (index === 0 ? 'none' : 'block')};
  cursor: pointer;
  &:hover {
    opacity: ${({ index }) => (index === 0 ? 0 : 0.7)};
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 5rem;
  }
`;
const NextIcon = styled(AiOutlineRight)<{ index: number | null; drawingsLength: number | null }>`
  font-size: 7rem;
  position: absolute;
  left: 95%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.palette.white};
  display: ${({ index, drawingsLength }) => (index! + 1 === drawingsLength ? 'none' : 'block')};
  cursor: pointer;
  &:hover {
    opacity: ${({ index, drawingsLength }) => (index! + 1 === drawingsLength ? 0 : 0.7)};
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
