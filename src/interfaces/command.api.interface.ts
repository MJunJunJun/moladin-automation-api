import { LooseDataInterface } from '@interfaces/data.command.api.interface';
import { CustomHeaderInterface } from '@interfaces/custom.header.interface';

export interface CommandAPIInterface {
    path: string;
    data: LooseDataInterface;
    token: string;
    baseURL?: string | null;
    type?: string | null;
    customHeaders?: Array<CustomHeaderInterface>;
    isErrorExpected: Boolean;
}
