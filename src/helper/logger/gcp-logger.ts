import winston, { format } from 'winston';
import dotenv from 'dotenv';

import { LoggingWinston } from '@google-cloud/logging-winston';
import { GCPLoggerOptionsInterface } from '@interfaces/gcp.logger.options.interface';

dotenv.config();

const createGCPLogger = (options: GCPLoggerOptionsInterface) => {
    const loggingWinston = new LoggingWinston({
        level: options.level,
        projectId: options.projectId,
        credentials: options.serviceAccountKey,
    });

    return winston.createLogger({
        level: options.level,
        format: format.printf((output) => `[${output.timestamp}] [${output.service}] ${output.level.toUpperCase()}: ${output.message}`),
        defaultMeta: { service: options.service, type: options.type },
        transports: [
            loggingWinston,
        ],
    });
};

export default createGCPLogger;
