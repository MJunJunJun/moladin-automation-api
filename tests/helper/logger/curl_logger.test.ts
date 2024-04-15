import { AxiosResponse } from 'axios';
import generateCurlCommand from '../../../src/helper/logger/curl-logger';

describe('generateCurlCommand', () => {
    test('should generate the correct curl command', () => {
        const response: AxiosResponse = {
            config: {
                method: 'GET',
                url: 'https://example.com',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer token123',
                },
            },
            data: {
                name: 'John Doe',
                age: 30,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            request: {},
        };

        const expectedCurlCommand = `curl -X GET 'https://example.com' -H 'Content-Type: application/json' -H 'Authorization: Bearer token123' -d '${JSON.stringify({ name: 'John Doe', age: 30 })}'`;
        const actualCurlCommand = generateCurlCommand(response as any); // Menambahkan any pada response
        expect(actualCurlCommand).toEqual(expectedCurlCommand); // Menggunakan toEqual
    });

    test('should handle missing headers and data', () => {
        const response: AxiosResponse = {
            config: {
                method: 'GET',
                url: 'https://example.com',
                headers: {},
            },
            data: undefined,
            status: 200,
            statusText: 'OK',
            headers: {},
            request: {},
        };
        const expectedCurlCommand = "curl -X GET 'https://example.com'";
        const actualCurlCommand = generateCurlCommand(response as any); // Menambahkan any pada response

        expect(actualCurlCommand).toEqual(expectedCurlCommand); // Menggunakan toEqual
    });
});
