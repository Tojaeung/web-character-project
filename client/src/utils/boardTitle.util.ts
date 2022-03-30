const boardTitle = (board: string) => {
  switch (board) {
    case 'drawingCommission':
      return '그림 커미션';
    case 'drawingRequest':
      return '그림 리퀘스트';
    case 'drawingSale':
      return '그림 분양';
    default:
      break;
  }
};

export default boardTitle;
