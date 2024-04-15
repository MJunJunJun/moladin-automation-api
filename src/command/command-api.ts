import dotenv from 'dotenv';
import { Logger } from 'winston';

import { AxiosError, AxiosResponse } from 'axios';
import { CommandAPIInterface } from '@interfaces/command.api.interface';
import { CustomHeaderInterface } from '@interfaces/custom.header.interface';
import { CustomAxiosResponse } from '@interfaces/custom.axios.interface';

import createConsoleLogger from '@helper/logger/console-logger';
import urlBuilder from '@helper/url-builder';
import headerBuilder from '@helper/header-builder';
import logWrapper from '@helper/logger/log-wrapper';
import http from '@helper/rate-limiter';

dotenv.config();

class CommandAPI {
    private data: unknown = {};

    private baseURL: string | undefined;

    private type: string = 'json';

    private customHeaders: Array<CustomHeaderInterface> = [];

    private readonly serviceName: string;

    private consoleLogger: Logger;

    // TODO: Add toggle for rate limiter, currently rate limiter is always enabled to 1RPS
    constructor(serviceName: string) {
        this.serviceName = serviceName;
        this.consoleLogger = createConsoleLogger(serviceName);
    }

    /**
     * Sends a POST request using Axios.
     * @param axiosInterface - The interface containing the Axios request parameters.
     * @returns A Promise that resolves to a CustomAxiosResponse object.
     * @throws An error if baseURL is not provided.
     */
    axiosPost = async (axiosInterface: CommandAPIInterface): Promise<CustomAxiosResponse> => {
        const { data } = axiosInterface;

        const url = urlBuilder(axiosInterface);
        const headers = headerBuilder(axiosInterface);

        try {
            const res = await http.post(url, data, {
                headers,
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            });

            await logWrapper(this.serviceName, res);

            this.consoleLogger.http(`Successfully sent POST request to ${url}`);
            return {
                ...(res as CustomAxiosResponse),
                mantisResponseTime: res.headers['request-duration'],
            };
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            const axiosResponse = axiosError.response as AxiosResponse;

            await logWrapper(this.serviceName, axiosResponse, true);

            this.consoleLogger.error(`Error sending POST request to ${url}`);
            return axiosResponse;
        }
    };

    /**
     * Sends a GET request using Axios.
     * @param axiosInterface - The interface containing the necessary parameters for the request.
     * @returns A promise that resolves to a CustomAxiosResponse object.
     * @throws An error if baseURL is not provided.
     */
    axiosGet = async (
        axiosInterface: Omit<CommandAPIInterface, 'data'>,
    ): Promise<CustomAxiosResponse> => {

        const url = urlBuilder({ ...axiosInterface, data: {} });
        const headers = headerBuilder({ ...axiosInterface, data: {} });


        try {
            const res = await http.get(url, { headers });

            await logWrapper(this.serviceName, res);

            this.consoleLogger.http(`Successfully sent GET request to ${url}`);
            return {
                ...res,
                mantisResponseTime: res.headers['request-duration'],
            };

        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            const axiosResponse = axiosError.response as AxiosResponse;

            await logWrapper(this.serviceName, axiosResponse, true);

            this.consoleLogger.error(`Error sending POST request to ${url}`);
            return axiosResponse;
        }
    };

    /**
     * Sends a PUT request using Axios.
     * @param axiosInterface - The interface containing the Axios request parameters.
     * @returns A promise that resolves to a CustomAxiosResponse object.
     * @throws An error if baseURL is not provided.
     */
    axiosPut = async (axiosInterface: CommandAPIInterface): Promise<CustomAxiosResponse> => {
        const { data } = axiosInterface;

        const url = urlBuilder(axiosInterface);
        const headers = headerBuilder(axiosInterface);

        try {
            const res = await http.put(url, data, { headers });

            await logWrapper(this.serviceName, res);

            this.consoleLogger.http(`Successfully sent PUT request to ${url}`);
            return {
                ...res,
                mantisResponseTime: res.headers['request-duration'],
            };

        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            const axiosResponse = axiosError.response as AxiosResponse;

            await logWrapper(this.serviceName, axiosResponse, true);

            this.consoleLogger.error(`Error sending PUT request to ${url}`);
            return axiosResponse;
        }
    };

    /**
     * Sends a PATCH request using Axios.
     * @param axiosInterface - The interface containing the Axios request parameters.
     * @returns A promise that resolves to a CustomAxiosResponse object.
     * @throws An error if baseURL is not provided.
     */
    axiosPatch = async (axiosInterface: CommandAPIInterface): Promise<CustomAxiosResponse> => {
        const { data } = axiosInterface;

        const url = urlBuilder(axiosInterface);
        const headers = headerBuilder(axiosInterface);


        try {
            const res = await http.patch(url, data, { headers });

            await logWrapper(this.serviceName, res);

            this.consoleLogger.http(`Successfully sent PATCH request to ${url}`);
            return {
                ...res,
                mantisResponseTime: res.headers['request-duration'],
            };

        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            const axiosResponse = axiosError.response as AxiosResponse;

            await logWrapper(this.serviceName, axiosResponse, true);

            this.consoleLogger.error(`Error sending PATCH request to ${url}`);
            return axiosResponse;
        }
    };

    /**
     * Sends a DELETE request using Axios.
     * @param axiosInterface - The interface containing the necessary parameters for the request.
     * @returns A promise that resolves to a CustomAxiosResponse object.
     * @throws An error if baseURL is not provided.
     */
    axiosDelete = async (
        axiosInterface: Omit<CommandAPIInterface, 'data'>,
    ): Promise<CustomAxiosResponse> => {

        const url = urlBuilder({ ...axiosInterface, data: {} });
        const headers = headerBuilder({ ...axiosInterface, data: {} });

        try {
            const res = await http.delete(url, { headers });

            await logWrapper(this.serviceName, res);

            this.consoleLogger.http(`Successfully sent DELETE request to ${url}`);
            return {
                ...res,
                mantisResponseTime: res.headers['request-duration'],
            };
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            const axiosResponse = axiosError.response as AxiosResponse;

            await logWrapper(this.serviceName, axiosResponse, true);

            this.consoleLogger.error(`Error sending DELETE request to ${url}`);
            return axiosResponse;
        }
    };

    /**
     * Sends a HEAD request using Axios.
     * @param axiosInterface - The interface containing the Axios configuration options.
     * @returns A promise that resolves to a CustomAxiosResponse object.
     * @throws An error if the baseURL is not provided.
     */
    axiosHead = async (
        axiosInterface: Omit<CommandAPIInterface, 'data'>,
    ): Promise<CustomAxiosResponse> => {

        const url = urlBuilder({ ...axiosInterface, data: {} });
        const headers = headerBuilder({ ...axiosInterface, data: {} });


        try {
            const res = await http.head(url, { headers });

            await logWrapper(this.serviceName, res);

            this.consoleLogger.http(`Successfully sent HEAD request to ${url}`);
            return {
                ...res,
                mantisResponseTime: res.headers['request-duration'],
            };

        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            const axiosResponse = axiosError.response as AxiosResponse;

            await logWrapper(this.serviceName, axiosResponse, true);

            this.consoleLogger.error(`Error sending HEAD request to ${url}`);
            return axiosResponse;
        }


    };
}

export default CommandAPI;
