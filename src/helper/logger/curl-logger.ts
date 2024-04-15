import winston from 'winston';
import CustomFileTransport from '@helper/logger/custom-file-transport';

const createCURLFileLogger = () => winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => `${info.timestamp}\n${info.message}\n\n`),
    ),
    transports: [
        new CustomFileTransport({
            filename: './logs/curl.txt',
        }),
    ],
});

export default createCURLFileLogger;
