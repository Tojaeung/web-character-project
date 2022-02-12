export const useEditorConfig = () => {
  const descModules = {
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

  const descFormats = [
    //'font',
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
    // 'clean',
  ];

  return [descModules, descFormats];
};
