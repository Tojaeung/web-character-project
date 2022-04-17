// exp(경험치)로 레벨을 리턴하는 함수입니다.
const getLevel = (exp: number | null) => {
  if (!exp) {
    return 0;
  } else if (0 <= exp && exp <= 100) return 1;
  else if (100 < exp && exp <= 500) return 2;
  else if (500 < exp && exp <= 1500) return 3;
  else if (1500 < exp && exp <= 10000) return 4;
  else if (10000 < exp && exp <= 50000) return 5;
  else if (50000 < exp && exp <= 150000) return 6;
  else if (150000 < exp && exp <= 300000) return 7;
  else if (300000 < exp && exp <= 600000) return 8;
  else if (600000 < exp && exp <= 1000000) return 9;
  else if (1000000 < exp) return 10;
};

export default getLevel;
