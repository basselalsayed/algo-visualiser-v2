/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unicorn/no-null */
// from https://gist.github.com/tkrotoff/a6baf96eb6b61b445a9142e5555511a0
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { cloneDeep, isObject } from 'lodash-es';
import { type Primitive } from 'type-fest';

export type NullToUndefined<T> = T extends null
  ? undefined
  : T extends Primitive | Function | Date | RegExp
    ? T
    : T extends (infer U)[]
      ? NullToUndefined<U>[]
      : T extends Map<infer K, infer V>
        ? Map<K, NullToUndefined<V>>
        : T extends Set<infer U>
          ? Set<NullToUndefined<U>>
          : T extends object
            ? { [K in keyof T]: NullToUndefined<T[K]> }
            : unknown;

export type UndefinedToNull<T> = T extends undefined
  ? null
  : T extends Primitive | Function | Date | RegExp
    ? T
    : T extends (infer U)[]
      ? UndefinedToNull<U>[]
      : T extends Map<infer K, infer V>
        ? Map<K, UndefinedToNull<V>>
        : T extends Set<infer U>
          ? Set<NullToUndefined<U>>
          : T extends object
            ? { [K in keyof T]: UndefinedToNull<T[K]> }
            : unknown;

function _nullToUndefined<T>(obj: T): NullToUndefined<T> {
  if (obj === null) {
    return undefined as NullToUndefined<T>;
  }

  if (isObject(obj)) {
    if (obj instanceof Map) {
      for (const [key, value] of obj.entries())
        obj.set(key, _nullToUndefined(value));
    } else {
      for (const key in obj) {
        obj[key] = _nullToUndefined(obj[key]) as any;
      }
    }
  }

  return obj as NullToUndefined<T>;
}

/**
 * Recursively converts all null values to undefined.
 *
 * @param obj object to convert
 * @returns a copy of the object with all its null values converted to undefined
 */
export function nullToUndefined<T>(obj: T) {
  return _nullToUndefined(cloneDeep(obj));
}

function _undefinedToNull<T>(obj: T): UndefinedToNull<T> {
  if (obj === undefined) {
    return null as UndefinedToNull<T>;
  }

  if (isObject(obj)) {
    if (obj instanceof Map) {
      for (const [key, value] of obj.entries())
        obj.set(key, _undefinedToNull(value));
    } else {
      for (const key in obj) {
        obj[key] = _undefinedToNull(obj[key]) as any;
      }
    }
  }

  return obj as UndefinedToNull<T>;
}

/**
 * Recursively converts all undefined values to null.
 *
 * @param obj object to convert
 * @returns a copy of the object with all its undefined values converted to null
 */
export function undefinedToNull<T>(obj: T) {
  return _undefinedToNull(cloneDeep(obj));
}
