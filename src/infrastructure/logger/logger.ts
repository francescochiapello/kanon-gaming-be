import { createLogger, format, transports } from 'winston';
const { combine, printf, label, timestamp } = format;

type LogType = {
  level: string;
  message: string;
  label: string;
  timestamp: string;
}

const myFormat = printf(({ level, message, label, timestamp }: LogType) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: 'kanon-gaming' }),
    timestamp(),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' })
  ]
});

export default logger;