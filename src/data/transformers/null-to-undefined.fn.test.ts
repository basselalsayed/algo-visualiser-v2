import { nullToUndefined, undefinedToNull } from './null-to-undefined.fn';

describe('null-to-undefined', () => {
  it('converts null to undefined', () => {
    const nullish = null;

    expect(nullToUndefined(nullish)).toBe(undefined);

    const nullishObject = {
      a: null,
      b: { c: null, d: [null, null] },
    };

    const undefinedObject = nullToUndefined(nullishObject);
    expect(undefinedObject.a).toBe(undefined);
    expect(undefinedObject.b.c).toBe(undefined);
    expect(undefinedObject.b.d[0]).toBe(undefined);
  });

  it('converts undefined to null', () => {
    const nullish = undefined;

    expect(undefinedToNull(nullish)).toBe(null);

    const nullishObject = {
      a: undefined,
      b: { c: undefined, d: [undefined, undefined] },
    };

    const undefinedObject = undefinedToNull(nullishObject);
    expect(undefinedObject.a).toBe(null);
    expect(undefinedObject.b.c).toBe(null);
    expect(undefinedObject.b.d[0]).toBe(null);
  });
});
