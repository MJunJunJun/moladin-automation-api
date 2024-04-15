import { CommandAPIInterface } from '@interfaces/command.api.interface';

const urlBuilder = (axiosInterface: CommandAPIInterface): string => {
    const { baseURL, path } = axiosInterface;
    if (!baseURL) {
        throw new Error('baseURL is required');
    }
    return `${baseURL}${path}`;
};

export default urlBuilder;
