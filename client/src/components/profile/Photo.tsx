import { useState, useEffect, useRef } from 'react';
import { Container } from './Photo.styled';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { getPhoto } from '@src/redux/requests/photo.request';
import { selectPhotoPhotos, selectPhotoIsLoading } from '@src/redux/slices/photo.slice';
import loading from '@src/images/loading.gif';

function Photo() {
  const dispatch = useAppDispatch();
  const { profileId } = useParams();

  const isLoading = useAppSelector(selectPhotoIsLoading);
  const photos = useAppSelector(selectPhotoPhotos);

  const [cursor, setCursor] = useState<number | null>(null);

  // 처음 그림 가져오기 (cursor = null)
  useEffect(() => {
    dispatch(getPhoto({ profileId, cursor: null }))
      .unwrap()
      .then((res) => {
        const { ok, message, newCursor } = res;
        if (!ok) return alert(message);
        setCursor(newCursor);
      });
  }, []);

  // 다음부터 cursor의 값에 따라 무한스크롤
  const pageEnd = useRef<HTMLInputElement>(null);
  const observer = new IntersectionObserver(
    async (entries) => {
      // if (entries[0].isIntersecting) {
      //   const res = await dispatch(getPhoto({ profileId, cursor })).unwrap();
      //   const { ok, message, newCursor } = res;
      //   if (!ok) return alert(message);
      //   setCursor(newCursor);
      // }
    },
    { threshold: 1 }
  );
  // observer.observe(pageEnd.current as HTMLInputElement);

  return (
    <Container>
      {photos?.map((photo) => (
        <div className="photo-container" key={photo.id}>
          <div>{photo.title}</div>
          <img className="photo-img" src={photo.url} alt="그림" />
          <div>{photo.photoTags.tag}</div>
          <div>{photo.content}</div>
        </div>
      ))}
      {isLoading ? <img src={loading} alt="로딩중..." /> : null}
      <input type="hidden" ref={pageEnd} />
    </Container>
  );
}

export default Photo;
