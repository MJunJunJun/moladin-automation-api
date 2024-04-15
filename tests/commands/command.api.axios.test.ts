import axios, {AxiosError} from 'axios';
import {RateLimitedAxiosInstance} from 'axios-rate-limit';
import CommandAPI from '@command/command-api';
import http from '../../src/helper/rate-limiter';
import  {CommandAPIInterface} from '@interfaces/command.api.interface';

jest.mock('../../src/helper/rate-limiter', () => {
    type RateLimitMock = Pick<RateLimitedAxiosInstance, 'post' | 'get' | 'put' | 'patch' | 'delete'>;

    const httpMock = {
        post: jest.fn(),
        get: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
    } as RateLimitMock;

    // Mock the default export and named export 'foo'
    return {
        __esModule: true,
        http: httpMock,
    };
});
const mockedHttp = http

describe('command api axios test', () => {
    const commandAPI = new CommandAPI('service-test');
    const objReqParam = {
        path: '/v1/master/product',
        data: {},
        token: 'qwertyzxc123456',
        isErrorExpected: false,
        type: null,
        baseURL: 'https://moladin-service.com',
    };
    const dummyCustomHeaders = [{
        key: 'api-token',
        value: 'qwertyzxc123456',
    }];
    const requestParam = (): CommandAPIInterface => ({ ...objReqParam });
    const requestParamCustomHeader = (): CommandAPIInterface => ({
        ...objReqParam,
        customHeaders: dummyCustomHeaders,
    });

    const mockError = {
        code: '500',
        response: {
            status: 500,
            data: { message: 'Internal server error' },
        },
        toJSON: () => {},
    } as AxiosError;

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('rate limited axios should be able to spawned', async () => {
        const responseMock = {
            success: true,
            message: 'Submission success',
            data: {
                id: 12345,
            },
        };
        // mockedHttp.post.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        // const response = await http.post('https://moladin-service.com');
        const response = await axios.post('https://moladin-service.com');
        expect(mockedHttp.post).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);
    });

    test('test axiost POST success should return response', async () => {
        const responseMock = {
            success: true,
            message: 'Submission success',
            data: {
                id: 12345,
            },
        };
        // mockedHttp.post.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        let response = await commandAPI.axiosPost(requestParam());
        expect(http.post).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);

        // Test with type form and baseUrl null
        response = await commandAPI.axiosPost({ ...requestParam(), type: 'form', baseURL: null });
        expect(mockedHttp.post).toBeCalledTimes(2);
        expect(response).toEqual(responseMock);
    });

    test('test axios POST Intended failed should return response', async () => {
        // mockedHttp.post.mockRejectedValueOnce(mockError);
        jest.fn().mockRejectedValueOnce(mockError);

        const requestParamWithError = requestParam();
        requestParamWithError.isErrorExpected = true;

        const response = await commandAPI.axiosPost(requestParamWithError);
        expect(mockedHttp.post).toBeCalledTimes(1);
        expect(response).toEqual(mockError.response);
    });

    test('test axios POST failed should return response', async () => {
        // mockedHttp.post.mockRejectedValueOnce(mockError);
        jest.fn().mockRejectedValueOnce(mockError);

        const response = await commandAPI.axiosPost(requestParam());
        expect(mockedHttp.post).toBeCalledTimes(1);
        expect(response).toEqual(mockError.response);
    });

    test('test axiost POST with custom header success should return response', async () => {
        const responseMock = {
            count: 1,
            data: {
                id: 'qwerty1234',
            },
        };
        // mockedHttp.post.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        const response = await commandAPI.axiosPost(requestParamCustomHeader());
        expect(mockedHttp.post).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);
    });

    test('test axiost POST with custom header and type Form success should return response', async () => {
        const responseMock = {
            count: 1,
            data: {
                id: 'qwerty1234',
            },
        };
        // mockedHttp.post.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        const response = await commandAPI.axiosPost({ ...requestParamCustomHeader(), type: 'form', baseURL: null });
        expect(mockedHttp.post).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);
    });

    test('test axios GET success should return response', async () => {
        const responseMock = {
            data: [
                { id: 1, type: 'car' },
                { id: 2, type: 'finance' },
            ],
        };
        // mockedHttp.get.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        let response = await commandAPI.axiosGet(requestParam());
        expect(mockedHttp.get).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);

        // Test with baseUrl null
        response = await commandAPI.axiosGet({ ...requestParam(), baseURL: null });
        expect(mockedHttp.get).toBeCalledTimes(2);
        expect(response).toEqual(responseMock);
    });

    test('test axios GET with Intended failed should return response', async () => {
        // mockedHttp.get.mockRejectedValueOnce(mockError);
        jest.fn().mockRejectedValueOnce(mockError);

        const requestParamWithError = requestParam();
        requestParamWithError.isErrorExpected = true;

        const response = await commandAPI.axiosGet(requestParamWithError);
        expect(mockedHttp.get).toBeCalledTimes(1);
        expect(response).toEqual(mockError.response);
    });

    test('test axios GET failed should return response', async () => {
        // mockedHttp.get.mockRejectedValueOnce(mockError);
        jest.fn().mockRejectedValueOnce(mockError);

        const response = await commandAPI.axiosGet(requestParam());
        expect(mockedHttp.get).toBeCalledTimes(1);
        expect(response).toEqual(mockError.response);
    });

    test('test axios GET with custom header success should return response', async () => {
        const responseMock = {
            count: 2,
            data: [
                { id: 1, type: 'car' },
                { id: 2, type: 'finance' },
            ],
        };
        // mockedHttp.get.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        let response = await commandAPI.axiosGet(requestParamCustomHeader());
        expect(mockedHttp.get).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);

        // Test with baseUrl null
        response = await commandAPI.axiosGet({ ...requestParamCustomHeader(), baseURL: null });
        expect(mockedHttp.get).toBeCalledTimes(2);
        expect(response).toEqual(responseMock);
    });

    test('test axiost PUT success should return response', async () => {
        const responseMock = {
            success: true,
            message: 'Edit application success',
            data: {
                id: 12345,
            },
        };
        // mockedHttp.put.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        let response = await commandAPI.axiosPut(requestParam());
        expect(mockedHttp.put).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);

        // Test with type form and baseUrl null
        response = await commandAPI.axiosPut({ ...requestParam(), type: 'form', baseURL: null });
        expect(mockedHttp.put).toBeCalledTimes(2);
        expect(response).toEqual(responseMock);
    });

    test('test axios PUT Intended failed should return response', async () => {
        // mockedHttp.put.mockRejectedValueOnce(mockError);
        jest.fn().mockRejectedValueOnce(mockError);

        const requestParamWithError = requestParam();
        requestParamWithError.isErrorExpected = true;

        const response = await commandAPI.axiosPut(requestParamWithError);
        expect(mockedHttp.put).toBeCalledTimes(1);
        expect(response).toEqual(mockError.response);
    });

    test('test axios PUT failed should return response', async () => {
        // mockedHttp.put.mockRejectedValueOnce(mockError);
        jest.fn().mockRejectedValueOnce(mockError);

        const response = await commandAPI.axiosPut(requestParam());
        expect(mockedHttp.put).toBeCalledTimes(1);
        expect(response).toEqual(mockError.response);
    });

    test('test axiost PUT success should return response', async () => {
        const responseMock = {
            success: true,
            message: 'Edit application success',
            data: {
                id: 12345,
            },
        };
        // mockedHttp.put.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        let response = await commandAPI.axiosPut(requestParamCustomHeader());
        expect(mockedHttp.put).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);

        // Test with type form and baseUrl null
        response = await commandAPI.axiosPut({ ...requestParamCustomHeader(), type: 'form', baseURL: null });
        expect(mockedHttp.put).toBeCalledTimes(2);
        expect(response).toEqual(responseMock);
    });

    test('test axiost PATCH success should return response', async () => {
        const responseMock = {
            success: true,
            message: 'Edit application success',
            data: {
                id: 12345,
            },
        };
        // mockedHttp.patch.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        let response = await commandAPI.axiosPatch(requestParam());
        expect(mockedHttp.patch).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);

        // Test with type form and baseUrl null
        response = await commandAPI.axiosPatch({ ...requestParamCustomHeader(), type: 'form', baseURL: null });
        expect(mockedHttp.patch).toBeCalledTimes(2);
        expect(response).toEqual(responseMock);
    });

    test('test axios PATCH failed should return response', async () => {
        // mockedHttp.patch.mockRejectedValueOnce(mockError);
        jest.fn().mockRejectedValueOnce(mockError);

        const response = await commandAPI.axiosPatch(requestParam());
        expect(mockedHttp.patch).toBeCalledTimes(1);
        expect(response).toEqual(mockError.response);
    });

    test('test axiost DELETE success should return response', async () => {
        const responseMock = {
            success: true,
            message: 'delete data success',
        };
        // mockedHttp.delete.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        let response = await commandAPI.axiosDelete(requestParam());
        expect(mockedHttp.delete).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);

        // Test with type form and baseUrl null
        response = await commandAPI.axiosDelete({ ...requestParam(), type: 'form', baseURL: null });
        expect(mockedHttp.delete).toBeCalledTimes(2);
        expect(response).toEqual(responseMock);
    });

    test('test axios DELETE Intended failed should return response', async () => {
        // mockedHttp.delete.mockRejectedValueOnce(mockError);
        jest.fn().mockRejectedValueOnce(mockError);

        const requestParamWithError = requestParam();
        requestParamWithError.isErrorExpected = true;

        const response = await commandAPI.axiosDelete(requestParamWithError);
        expect(mockedHttp.delete).toBeCalledTimes(1);
        expect(response).toEqual(mockError.response);
    });

    test('test axios DELETE failed should return response', async () => {
        // mockedHttp.delete.mockRejectedValueOnce(mockError);
        jest.fn().mockRejectedValueOnce(mockError);

        const response = await commandAPI.axiosDelete(requestParam());
        expect(mockedHttp.delete).toBeCalledTimes(1);
        expect(response).toEqual(mockError.response);
    });

    test('test axiost DELETE with custom header success should return response', async () => {
        const responseMock = {
            success: true,
            message: 'delete data success',
        };
        // mockedHttp.delete.mockResolvedValue(responseMock);
        jest.fn().mockResolvedValue(responseMock);

        let response = await commandAPI.axiosDelete(requestParamCustomHeader());
        expect(mockedHttp.delete).toBeCalledTimes(1);
        expect(response).toEqual(responseMock);

        // Test with type form and baseUrl null
        response = await commandAPI.axiosDelete({ ...requestParamCustomHeader(), type: 'form', baseURL: null });
        expect(mockedHttp.delete).toBeCalledTimes(2);
        expect(response).toEqual(responseMock);
    });
});
