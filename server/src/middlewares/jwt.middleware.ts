import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '@src/helpers/winston.helper';

// 유저 서비스 사용을 위한 인증과 관련하여 엑세스토큰, 리프레쉬토큰을 관리하는 API입니다.
const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.cookies;

    // 클라이언트 AT 유무를 확인합니다.
    if (!accessToken) {
      logger.warn('클라이언트에 AT가 존재하지 않습니다.');
      return res.status(400).json({ status: false, message: '로그인 후 사용가능합니다.' });
    }

    const decodedAT = (await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string)) as JwtPayload;
    if (!decodedAT) {
      logger.warn('유효하지 않은 AT입니다.');
      return res.status(400).json({ status: false, message: '유효하지 않은 토큰입니다.' });
    }

    // 클라이언트에 AT가 존재한다면 변수에 넣어 API에게 넘겨준다.
    res.locals.user = decodedAT.user;
    next();
  } catch (err: any) {
    logger.error('jwt 미들웨어 에러 :', err);
    return res.status(500).clearCookie('accessToken').json({ status: false, message: 'jwt 미들웨어 에러' });
  }
};

export default jwtAuth;
