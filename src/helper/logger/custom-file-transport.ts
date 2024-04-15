import fs from 'fs';
import winston from 'winston';
import { FileTransportOptions } from 'winston/lib/winston/transports';

class CustomFileTransport extends winston.transports.File {
    constructor(options: FileTransportOptions) {
        super(options);

        const logDir = './logs';
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
    }

    log(info: unknown, callback: () => void) {
        if (super.log) {
            super.log(info, callback);
        } else {
            callback();
        }
    }
}

export default CustomFileTransport;
