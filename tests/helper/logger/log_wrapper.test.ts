import createFileLogger from '@helper/logger/file-logger';
import generateCurlCommand from '@helper/logger/curl-logger';
import logWrapper from '@helper/logger/log-wrapper';


describe('logWrapper', () => {
    // Logs API request and response with correct service name and data
    it('should log API request and response with correct service name and data', async () => {
        // Arrange
        const serviceName = 'exampleService';
        const response = {
            config: {
                method: 'GET',
                url: 'https://example.com',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer token',
                },
            },
            data: {
                id: 1,
                name: 'John Doe',
            },
        };
        const isError = false;
        const responseLogger = createFileLogger(serviceName, 'response');
        const requestLogger = createFileLogger(serviceName, 'request');
        const generateCurlCommandSpy = jest.spyOn(global, 'generateCurlCommand');
        const stepSpy = jest.spyOn(global, 'step');

        // Act
        await logWrapper(serviceName, response, isError);

        // Assert
        expect(generateCurlCommandSpy).toHaveBeenCalledWith(response);
        expect(stepSpy).toHaveBeenCalledTimes(2);
        expect(stepSpy).toHaveBeenNthCalledWith(1, 'API Request', expect.any(Function));
        expect(stepSpy).toHaveBeenNthCalledWith(2, 'API Response', expect.any(Function));
        expect(requestLogger.http).toHaveBeenCalledWith(
            generateCurlCommandSpy.mock.results[0].value,
        );
        expect(responseLogger.http).toHaveBeenCalledWith(JSON.stringify(response.data, null, 2));
    });

    // Handles missing service name correctly
    it('should handle missing service name correctly', async () => {
        // Arrange
        const response = {
            config: {
                method: 'GET',
                url: 'https://example.com',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer token',
                },
            },
            data: {
                id: 1,
                name: 'John Doe',
            },
        };
        const isError = false;
        const responseLogger = createFileLogger(undefined, 'response');
        const requestLogger = createFileLogger(undefined, 'request');
        const generateCurlCommandSpy = jest.spyOn(global, 'generateCurlCommand');
        const stepSpy = jest.spyOn(global, 'step');

        // Act
        await logWrapper(undefined, response, isError);

        // Assert
        expect(generateCurlCommandSpy).toHaveBeenCalledWith(response);
        expect(stepSpy).toHaveBeenCalledTimes(2);
        expect(stepSpy).toHaveBeenNthCalledWith(1, 'API Request', expect.any(Function));
        expect(stepSpy).toHaveBeenNthCalledWith(2, 'API Response', expect.any(Function));
        expect(requestLogger.http).toHaveBeenCalledWith(
            generateCurlCommandSpy.mock.results[0].value,
        );
        expect(responseLogger.http).toHaveBeenCalledWith(JSON.stringify(response.data, null, 2));
    });
});
