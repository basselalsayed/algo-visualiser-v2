import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type T0 =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';

export function assert(value: unknown, type: T0): asserts value is T0 {
  const actualType = typeof value;

  if (type === 'object') {
    if (value === null) {
      throw new TypeError(`Expected type '${type}', but received null`);
    }
  }

  if (actualType !== type) {
    throw new TypeError(
      `Expected type '${type}', but received '${actualType}'`
    );
  }
}
