import { isObject, transform } from 'lodash-es';

export type MapKeysArg = Record<string, unknown> | Record<string, unknown>[];

export const deepMapKeys = (
  obj: Record<string, unknown> | Record<string, unknown>[],
  transformer: (s: string) => string
) =>
  transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const transformedKey = Array.isArray(target) ? key : transformer(key);
      const isMappable = isObject(value) && !(value instanceof Date);
      result[transformedKey] = isMappable
        ? deepMapKeys(value as Record<string, unknown>, transformer)
        : value;
    }
  );
