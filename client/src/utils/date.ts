import moment from 'moment';

export const messageDate = () => {
  const year = moment().format('YYYY년');
  const month = moment().format('M월');
  const day = moment().format('D일');

  const dayNumber = moment().day();
  let koreaDay = '';
  switch (dayNumber) {
    case 0:
      koreaDay = '일요일';
      break;
    case 1:
      koreaDay = '월요일';
      break;
    case 2:
      koreaDay = '화요일';
      break;
    case 3:
      koreaDay = '수요일';
      break;
    case 4:
      koreaDay = '목요일';
      break;
    case 5:
      koreaDay = '금요일';
      break;
    case 6:
      koreaDay = '토요일';
      break;
  }

  const time = moment().format('LT');

  const date = [year, month, day, koreaDay, time].join('-');

  return date;
};
