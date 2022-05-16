const notificationType = (type: 'comment' | 'like' | 'penalty') => {
  switch (type) {
    case 'comment':
      return '댓글';

    case 'like':
      return '좋아요';

    case 'penalty':
      return '제재';
  }
};

export default notificationType;
