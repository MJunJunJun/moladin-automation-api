jest.mock('@driver/api.driver', () => require('@driver/__mocks__/api.driver'));
// import UtilityAPI from '@command/command-utility';
import UtilityAPI from '../../src/command/command-utility'

 import { mockPause } from "@driver/__mocks__/api.driver";

describe('test command utility', () => {
    test('test delay command', async () => {
        await UtilityAPI.delay(3000);
        expect(mockPause).toHaveBeenCalledWith(3000);
        
        // Skip Tes karena driver @driver/__mocks__/api.driver tidak tahu dari mana
       // expect(true)
    });
});
