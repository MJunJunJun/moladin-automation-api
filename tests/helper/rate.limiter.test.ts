import axios from 'axios';
import http from '../../src/helper/rate-limiter';
import rateLimit from 'axios-rate-limit';
import { RateLimitedAxiosInstance } from 'axios-rate-limit';

jest.mock('axios', () => ({
    create: jest.fn()
}));

jest.mock('axios-rate-limit', () => {
    const originalModule = jest.requireActual('axios-rate-limit');
    type RateLimitMock = Pick<RateLimitedAxiosInstance, 'post'>;

    const rateLimiterMocked = {
        post: jest.fn()
    } as RateLimitMock;

    return {
        __esModule: true,
        ...originalModule,
        default: jest.fn(() => rateLimiterMocked)
    };
});

describe('test rate limiter axios', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('test rate limiter on method POST as sample', async () => {
        await http.post('https://moladin-service.com');
        expect(rateLimit).toBeCalled();
        expect(rateLimit).toBeCalledWith(axios.create(), { maxRequests: 1, perMilliseconds: 1000, maxRPS: 1 });
    });
});
