import winston, { format } from 'winston';
import CustomFileTransport from '@helper/logger/custom-file-transport';

const { combine, timestamp, printf } = format;

const colorizer = winston.format.colorize();
const createFileLogger = (service?: string, type = 'response', level = 'debug') => winston.createLogger({
    level,
    defaultMeta: { service },

    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        printf((output) => colorizer.colorize(
            output.level,
            `[${output.timestamp}] [${output.service}] ${output.level.toUpperCase()}: ${
                output.message
            }`,
        )),
    ),
    transports: [
        // Output logs to file in JSON format based on their level
        new CustomFileTransport({
            format: winston.format.json(),
            filename: `./logs/${type}.json`,
        }),
    ],
});

export default createFileLogger;
