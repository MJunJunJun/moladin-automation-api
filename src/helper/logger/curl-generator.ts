import { AxiosResponse } from 'axios';

const SKIPPED_HEADERS = ['Accept', 'User-Agent', 'Accept-Encoding', 'Content-Length', 'Host', 'Connection', 'Cache-Control'];

function generateCurlCommand(response: AxiosResponse): string {
    const { config } = response;
    const { method, url, headers } = config;

    let curlCommand = `curl -X ${method?.toUpperCase()} '${url}'`;

    // Add headers to the curl command
    if (headers) {
        // exclude headers defined by SKIPPED_HEADERS
        Object.keys(headers)
            .filter((key) => !SKIPPED_HEADERS.includes(key))
            .forEach((key) => {
                const value = headers[key];
                curlCommand += ` -H '${key}: ${value}'`;
            });
    }

    // Add request body to the curl command
    if (config.data) {
        curlCommand += ` -d '${config.data}'`;
    }

    return curlCommand;
}

export default generateCurlCommand;
