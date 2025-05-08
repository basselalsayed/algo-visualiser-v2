import { transformDTO, transformParams } from '.';

describe('transformParams', () => {
  it('should transform correctly', () => {
    const params = {
      myParam1: undefined,
      myParam2: {
        myParam3: undefined,
      },
    };

    const transformed = transformParams(params);

    expect(transformed.my_param_1).toBe(null);
    expect(transformed.my_param_2.my_param_3).toBe(null);
  });
});
describe('transformDTO', () => {
  it('should transform correctly', () => {
    const params = {
      my_param_1: null,
      my_param_2: {
        my_param_3: null,
      },
    };

    const transformed = transformDTO(params);

    expect(transformed.myParam1).toBe(undefined);
    expect(transformed.myParam2.myParam3).toBe(undefined);
  });
});
