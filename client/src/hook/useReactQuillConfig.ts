import React, { useMemo, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';

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
  const [imageKeys, setImageKeys] = useState<string[]>([]);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        const formData = new FormData();
        formData.append('image', file[0]);
        try {
          const res = await axios.post('/api/board/imageUpload', formData, { withCredentials: true });

          const { ok, message, imageKey, imageUrl } = res.data;
          if (!ok) return alert(message);
          setImageKeys((prevImageKeys) => prevImageKeys.concat(imageKey));

          const range = quillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = quillRef.current?.getEditor();

            quill?.setSelection(range, 1);
            quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${imageUrl} alt="이미지" />`);
          }
        } catch (error: any) {
          const err = error;
          return { ...err.response, success: false };
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
    }),
    []
  );
  return [imageUploadModules, imageKeys];
};
