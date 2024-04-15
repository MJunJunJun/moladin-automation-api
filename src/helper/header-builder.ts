import { CommandAPIInterface } from '@interfaces/command.api.interface';
import dotenv from 'dotenv';

dotenv.config();

const headerBuilder = (axiosInterface: CommandAPIInterface) => {
    const {
        type, customHeaders, token, data,
    } = axiosInterface;
    let headers = {
        ...(type === 'json' && { 'Content-Type': 'application/json' }),
        ...(type === 'form' && {
            // eslint-disable-next-line no-underscore-dangle
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }),
        Authorization: `Bearer ${token}`,
        ...(process.env.IS_CI && { mantis: 'enable' }),
    };
    customHeaders?.forEach((item) => {
        headers = { ...headers, [item.key]: item.value };
    });
    return headers;
};

export default headerBuilder;
