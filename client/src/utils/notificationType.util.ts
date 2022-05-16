const notificationType = (type: 'comment' | 'like' | 'warning') => {
  switch (type) {
    case 'comment':
      return '댓글';

    case 'like':
      return '좋아요';

    case 'warning':
      return '경고';
  }
};

export default notificationType;
