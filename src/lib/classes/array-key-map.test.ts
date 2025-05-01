import { describe, expect, it } from 'vitest';

import { ArrayKeyMap } from './array-key-map'; // adjust the path if needed

describe('ArrayKeyMap', () => {
  it('should set and get values with array keys', () => {
    const map = new ArrayKeyMap<[number, number], string>();
    map.set([1, 2], 'value');

    expect(map.get([1, 2])).toBe('value');
  });

  it('should recognize equal keys with has()', () => {
    const map = new ArrayKeyMap<[string, string], string>();
    map.set(['a', 'b'], 'val');

    expect(map.has(['a', 'b'])).toBe(true);
    expect(map.has(['b', 'a'])).toBe(false);

    const complexMap = new ArrayKeyMap<Record<string, unknown>[], string>();

    complexMap.set(
      [
        { a: true, b: false },
        { a: false, b: true },
      ],
      'val'
    );

    expect(
      complexMap.has([
        { a: true, b: false },
        { a: false, b: true },
      ])
    ).toBe(true);
    expect(
      complexMap.has([
        { a: false, b: true },
        { a: true, b: false },
      ])
    ).toBe(false);
  });

  it('should delete keys correctly', () => {
    const map = new ArrayKeyMap<[number, number], string>();
    map.set([3, 4], 'deleteMe');

    expect(map.delete([3, 4])).toBe(true);
    expect(map.has([3, 4])).toBe(false);
  });

  it('should return undefined for nonexistent keys', () => {
    const map = new ArrayKeyMap<[number, number], string>();

    expect(map.get([0, 0])).toBeUndefined();
  });

  it('should clone the map', () => {
    const original = new ArrayKeyMap<[number], string>();
    original.set([42], 'original');

    const clone = original.clone();
    expect(clone.get([42])).toBe('original');

    clone.set([43], 'new');
    expect(original.has([43])).toBe(false);
  });
});
