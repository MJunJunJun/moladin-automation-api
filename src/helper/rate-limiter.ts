import axios from 'axios';
import rateLimit from 'axios-rate-limit';


const http = rateLimit(axios.create(), {
    maxRequests: 1,
    perMilliseconds: 1000,
    maxRPS: 1,
});

http.interceptors.request.use((config) => {
    const modifiedConfig = { ...config };
    modifiedConfig.headers['request-startTime'] = new Date().getTime();
    return modifiedConfig;
});

http.interceptors.response.use((response) => {
    const currentTime = new Date().getTime();
    const startTime = response.config.headers['request-startTime'];
    response.headers['request-duration'] = currentTime - startTime;
    return response;
});

export default http;