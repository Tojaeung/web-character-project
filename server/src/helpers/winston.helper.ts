import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: `${__dirname}/../logs`,
      filename: `%DATE%.info.log`,
      maxFiles: 15, // 15일치 로그 파일 저장
      zippedArchive: true, // 압축해서 저장
    }),
    new winstonDaily({
      level: 'warn',
      datePattern: 'YYYY-MM-DD',
      dirname: `${__dirname}/../logs/warn`,
      filename: `%DATE%.warn.log`,
      maxFiles: 15, // 15일치 로그 파일 저장
      zippedArchive: true, // 압축해서 저장
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${__dirname}/../logs/error`,
      filename: `%DATE%.error.log`,
      maxFiles: 15, // 15일치 로그 파일 저장
      zippedArchive: true, // 압축해서 저장
    }),
  ],
});

export const stream = {
  write: (message: any) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
        logFormat // log format 적용
      ),
    })
  );
}

export default logger;
