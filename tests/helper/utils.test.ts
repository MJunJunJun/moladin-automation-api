import UtilityAPI from '@command/command-utility';
import { ObjectInputInterface } from '@interfaces/object.input.interface';

describe('utils function test', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('test construct form data object', async () => {
        let data: ObjectInputInterface = {
            productId: 1,
            asoId: 1235
        };
    
        const formData = await UtilityAPI.constructPayloadFormData(data);
        console.log(formData); // Tambahkan ini untuk memeriksa nilai formData
        expect(formData).toBeTruthy();
        expect(formData instanceof FormData).toBe(true);
    });
    

    test('test query builder', () => {
        // Test case 1
        const dataObj1 = { name: 'John', age: '30' };
        const query1 = UtilityAPI.queryBuilder(dataObj1);
        expect(query1).toBe('?name=John&age=30');

        // Test case 2
        const dataObj2 = { category: 'books', author: 'Jane Doe' };
        const query2 = UtilityAPI.queryBuilder(dataObj2);
        expect(query2).toBe('?category=books&author=Jane%20Doe');

        // Test case 3
        const dataObj3 = {};
        const query3 = UtilityAPI.queryBuilder(dataObj3);
        expect(query3).toBe('?');
    });
});

