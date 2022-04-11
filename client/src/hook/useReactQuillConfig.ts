import React, { useMemo, useState } from 'react';
// import axios from 'axios';
import ReactQuill, { Quill } from 'react-quill';
import { useAppDispatch } from '@src/store/app/hook';
import { imageUpload } from '@src/store/requests/post.request';
import imageResize from 'quill-image-resize';
Quill.register('modules/imageResize', imageResize);

export const useDefaultConfig = () => {
  const defaultModules = {
    toolbar: [
      // [{ header: [1, 2, false] }],
      [{ size: [] }],
      // [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      // ['link', 'image', 'video'],
      [{ align: [] }, { color: [] }, { background: [] }],
      // ['clean'],
    ],
  };
  return [defaultModules];
};

export const useImageUploadConfig = (quillRef: React.RefObject<ReactQuill>) => {
  const dispatch = useAppDispatch();
  const [imageKeys, setImageKeys] = useState<string[]>([]);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/png');
    input.setAttribute('accept', 'image/jpeg');
    input.setAttribute('accept', 'image/jpg');
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        const formData = new FormData();
        formData.append('image', file[0]);
        try {
          const res = await dispatch(imageUpload(formData)).unwrap();

          const { imageKey, imageUrl } = res;

          setImageKeys((prevImageKeys) => prevImageKeys.concat(imageKey));

          const range = quillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = quillRef.current?.getEditor();

            quill?.setSelection(range, 1);
            quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${imageUrl} alt="이미지" />`);
          }
        } catch (err: any) {
          alert(err.message);
        }
      }
    };
  };
  const imageUploadModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          [{ align: [] }, { color: [] }, { background: [] }],
          ['link', 'image', 'video'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        parchment: Quill.import('parchment'),
      },
    }),
    []
  );
  return { imageUploadModules, imageKeys };
};
