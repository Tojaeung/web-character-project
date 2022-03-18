import moment from 'moment';

const relativeTime = (date: Date | string) => {
  const diffTime = moment().diff(moment(date), 'days');

  if (diffTime > 0) {
    const formatTime = moment(date).format('YYYY.MM.DD LT');
    return formatTime;
  } else {
    const relativeTime = moment(date).fromNow();
    return relativeTime;
  }
};

export default relativeTime;
