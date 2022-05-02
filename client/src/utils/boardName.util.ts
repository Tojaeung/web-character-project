const boardTitle = (board: string) => {
  switch (board) {
    case 'free':
      return '자유게시판';
    case 'commission':
      return '그림 커미션';
    case 'reque':
      return '그림 리퀘스트';
    case 'sale':
      return '그림 분양';

    default:
      break;
  }
};

export default boardTitle;
