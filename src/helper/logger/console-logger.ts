import winston, { format } from 'winston';

const { combine, timestamp, printf } = format;

const colorizer = winston.format.colorize();

// Create the logger instance
const createConsoleLogger = (service?: string, level: string = 'debug') => winston.createLogger({
    level,
    defaultMeta: { service },
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        printf((output) => colorizer.colorize(
            output.level,
            `[${output.timestamp}] [${
                output.service
            }] ${output.level.toUpperCase()}: ${output.message}`,
        )),
    ),
    transports: [
        // Output logs to console in simple message format
        new winston.transports.Console(),
    ],
});

export default createConsoleLogger;
