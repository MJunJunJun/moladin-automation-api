import { AxiosResponse } from 'axios';

export interface CustomAxiosResponse<T = unknown> extends AxiosResponse<T> {
    mantisResponseTime?: string;
}
