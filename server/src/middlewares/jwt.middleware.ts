import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import redisClient from '@src/config/redis.config';
import { User } from '@src/entities/user.entity';
import logger from '@src/config/winston';

// 유저 서비스 사용을 위한 인증과 관련하여 엑세스토큰, 리프레쉬토큰을 관리하는 API입니다.
const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 클라이언트 엑세스 토큰 유무를 확인합니다.
    const { accessToken } = req.cookies;
    if (!accessToken) {
      logger.warn('로그인 후 사용가능합니다.');
      return res.status(400).json({ status: false, message: '로그인 후 사용가능합니다.' });
    }
    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;

    // 레디스에 저장된 리프레쉬 토큰 유무를 확인합니다.
    const refreshToken = await redisClient.get(decodedAccessToken.id);
    if (!refreshToken) {
      logger.warn('로그인 후 사용가능합니다.');
      return res.status(400).clearCookie('accessToken').json({ status: false, message: '로그인 후 사용가능합니다.' });
    }

    // 엑세스토큰과 리프레쉬 토큰의 값이 같다면 클라이언트에 새로운 엑세스 토큰을 발급합니다.
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    if (decodedAccessToken.id !== decodedRefreshToken.id) {
      logger.warn('로그인 후 사용가능합니다.');
      return res.status(400).clearCookie('accessToken').json({ status: false, message: '로그인 후 사용가능합니다.' });
    } else {
      const newAccessToken = jwt.sign({ id: decodedAccessToken.id }, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: '7d',
      });
      logger.info('새로운 엑세스 토큰을 발급했습니다.');
      res.status(200).cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    }

    const user = await User.findOne({ id: decodedAccessToken.id });
    res.locals.user = user;
    next();
  } catch (err: any) {
    logger.error('jwt 미들웨어 에러 :', err.message);
    return res.status(500).clearCookie('accessToken').json({ status: false, message: 'jwt 미들웨어 에러' });
  }
};

export default jwtAuth;
