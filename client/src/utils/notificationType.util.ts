const notificationType = (type: 'comment' | 'like' | 'dislike') => {
  switch (type) {
    case 'comment':
      return '댓글';

    case 'like':
      return '좋아요';

    case 'dislike':
      return '싫어요';
  }
};

export default notificationType;
