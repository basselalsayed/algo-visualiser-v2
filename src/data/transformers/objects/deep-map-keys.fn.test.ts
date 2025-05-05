import { describe, expect, it } from 'vitest';

import { deepMapKeys } from './deep-map-keys.fn';

const toUpperCase = (str: string) => str.toUpperCase();

describe('deepMapKeys', () => {
  it('should transform keys of a flat object', () => {
    const input = { a: 1, b: 2 };
    const output = deepMapKeys(input, toUpperCase);
    expect(output).toEqual({ A: 1, B: 2 });
  });

  it('should transform keys of a nested object', () => {
    const input = { a: { b: 2, c: 3 } };
    const output = deepMapKeys(input, toUpperCase);
    expect(output).toEqual({ A: { B: 2, C: 3 } });
  });

  it('should  transform keys inside arrays', () => {
    const input = [{ a: 1 }, { b: 2 }];
    const output = deepMapKeys(input, toUpperCase);
    expect(output).toEqual([{ A: 1 }, { B: 2 }]);
  });

  it('should transform keys in an object that contains arrays of objects', () => {
    const input = { items: [{ a: 1 }, { b: 2 }] };
    const output = deepMapKeys(input, toUpperCase);
    expect(output).toEqual({ ITEMS: [{ A: 1 }, { B: 2 }] });
  });

  it('should leave Date objects untouched', () => {
    const date = new Date();
    const input = { createdAt: date };
    const output = deepMapKeys(input, toUpperCase);
    expect(output).toEqual({ CREATEDAT: date });
  });
});
