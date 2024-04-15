import createFileLogger from '@helper/logger/file-logger';

import { step } from '@wdio/allure-reporter';
import { AxiosResponse } from 'axios';
import generateCurlCommand from '@helper/logger/curl-generator';
import createCURLFileLogger from '@helper/logger/curl-logger';

const logWrapper = async (serviceName: string|undefined, response: any, isError = false) => {
    const responseLogger = createFileLogger(serviceName, 'response');
    const requestLogger = createCURLFileLogger();
    await step(`[${response.config.method?.toUpperCase() ?? 'API Call'}] ${response.config.url}`, async (s) => {
        await s.step('API Request', async (s1) => {
            s1.attach(`${generateCurlCommand(response)}`, 'text/plain');
            if (isError) {
                requestLogger.error(generateCurlCommand(response));
            } else {
                requestLogger.http(generateCurlCommand(response));
            }
        });
        await s.step('API Response', async (s1) => {
            s1.attach(JSON.stringify(response.data, null, 2), 'application/json');
            if (isError) {
                responseLogger.error(response.data);
            } else {
                responseLogger.http(response.data);
            }
        });
    });
};

export default logWrapper;
