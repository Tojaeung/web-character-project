import React from 'react';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectDrawing, selectDrawingDrawings, selectDrawingIndex } from '@src/store/slices/drawing.slice';
import { addDrawingView } from '@src/store/requests/drawing.request';

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
    await dispatch(addDrawingView({ drawingId: drawings[index!]!.id }));
  };

  // 다음 그림
  const onNextDrawing = async (e: any) => {
    if (index! + 1 === drawings.length) {
      await dispatch(selectDrawing({ selectedIndex: drawings.length - 1 }));
      return;
    }

    await dispatch(selectDrawing({ selectedIndex: index! + 1 }));
    await dispatch(addDrawingView({ drawingId: drawings[index!]!.id }));
  };

  return (
    <Container>
      <PrevIcon index={index} onClick={onPrevDrawing} />

      <ImageBox>
        <Image src={drawings[index!]?.url} alt="이미지" />
      </ImageBox>

      <NextIcon index={index} total={drawings.length} onClick={onNextDrawing} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  @media ${({ theme }) => theme.device.tablet} {
    max-height: 30rem;
    justify-content: center;
    overflow: hidden;
  }
`;

const PrevIcon = styled(AiOutlineLeft)<{ index: number | null }>`
  font-size: 7rem;
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.palette.black};
  display: ${({ index }) => (index === 0 ? 'none' : 'block')};
  background-color: ${({ theme }) => theme.palette.gray};
  border: 1px solid ${({ theme }) => theme.palette.black};
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    opacity: ${({ index }) => (index === 0 ? 0 : 0.7)};
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 4rem;
  }
`;
const NextIcon = styled(AiOutlineRight)<{ index: number | null; total: number | null }>`
  font-size: 7rem;
  position: absolute;
  left: 95%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.gray};
  color: ${({ theme }) => theme.palette.black};
  border: 1px solid ${({ theme }) => theme.palette.black};
  border-radius: 50%;
  display: ${({ index, total }) => (index! + 1 === total ? 'none' : 'block')};
  cursor: pointer;
  &:hover {
    opacity: ${({ index, total }) => (index! + 1 === total ? 0 : 0.7)};
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 4rem;
  }
`;
const ImageBox = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    height: 100%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default ImageSide;
