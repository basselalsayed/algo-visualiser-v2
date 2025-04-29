import { type ClassValue, clsx } from 'clsx';
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

  if (type === 'object' && value === null) {
    throw new TypeError(`Expected type '${type}', but received null`);
  }

  if (actualType !== type) {
    throw new TypeError(
      `Expected type '${type}', but received '${actualType}'`
    );
  }
}

export function typeIs(value: unknown, type: T0): value is T0 {
  try {
    assert(value, type);
    return true;
  } catch {
    return false;
  }
}

export function convertToSeconds(
  start: DOMHighResTimeStamp,
  end: DOMHighResTimeStamp
) {
  const seconds = (end - start) / 1000;
  return Math.floor(seconds * 1000) / 1000;
}

export function elementIsFullyScrolled(element: HTMLElement): boolean {
  return (
    Math.floor(element.scrollHeight - element.scrollTop) ===
    Math.floor(element.clientHeight)
  );
}

export function getCSSVariable(
  name: string,
  element: HTMLElement | SVGElement = document.documentElement
) {
  return getComputedStyle(element).getPropertyValue(name);
}

export function setCSSVariable(
  name: string,
  value: string | number,
  element: HTMLElement | SVGElement = document.documentElement
) {
  element.style.setProperty(name, String(value));
}

export function noOp() {
  return;
}
