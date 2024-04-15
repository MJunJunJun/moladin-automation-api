import FormData from 'form-data';
import { ObjectInputInterface } from '@interfaces/object.input.interface';

class UtilityAPI {
    static async delay(timeout: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }

    static constructPayloadFormData(objectInput: ObjectInputInterface): object {
        const formBuilder = new FormData();
        Object.keys(objectInput).forEach((keyObject) => {
            formBuilder.append(keyObject, objectInput[keyObject]);
        });
        return formBuilder;
    }

    static queryBuilder(dataObj: { [key: string]: string }): string {
        const query = Object.keys(dataObj)
            .map((key) => `${key}=${encodeURIComponent(dataObj[key])}`)
            .join('&');
        return `?${query}`;
    }
}

export default UtilityAPI;