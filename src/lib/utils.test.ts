// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest';

import {
  assert,
  convertToSeconds,
  elementIsFullyScrolled,
  getCSSVariable,
  noOp,
  setCSSVariable,
  sleep,
  typeIs,
} from './utils';

describe('utils', () => {
  it('sleep resolves after given time (mocked)', async () => {
    vi.useFakeTimers();
    const spy = vi.fn();

    sleep(1000).then(spy);

    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    await vi.runAllTicks();
    expect(spy).toHaveBeenCalledOnce();

    vi.useRealTimers();
  });

  describe('assert', () => {
    it('should not throw for correct type', () => {
      expect(() => assert('hello', 'string')).not.toThrow();
    });

    it('should throw for wrong type', () => {
      expect(() => assert(123, 'string')).toThrowError(
        "Expected type 'string', but received 'number'"
      );
    });

    it('should throw for null when expecting object', () => {
      expect(() => assert(null, 'object')).toThrowError(
        "Expected type 'object', but received null"
      );
    });
  });

  describe('typeIs', () => {
    it('returns true for correct type', () => {
      expect(typeIs(42, 'number')).toBe(true);
      expect(typeIs(false, 'boolean')).toBe(true);
    });

    it('returns false for incorrect type', () => {
      expect(typeIs('42', 'number')).toBe(false);
      expect(typeIs(undefined, 'object')).toBe(false);
    });
  });

  it('convertToSeconds should return rounded difference in seconds', () => {
    const result = convertToSeconds(1000, 2500); // 1.5 seconds
    expect(result).toBe(1.5);
  });

  describe('elementIsFullyScrolled', () => {
    it('should return true when fully scrolled', () => {
      const el = {
        clientHeight: 100,
        scrollHeight: 150,
        scrollTop: 50,
      } as HTMLElement;

      expect(elementIsFullyScrolled(el)).toBe(true);
    });

    it('should return false when not fully scrolled', () => {
      const el = {
        clientHeight: 100,
        scrollHeight: 150,
        scrollTop: 20,
      } as HTMLElement;

      expect(elementIsFullyScrolled(el)).toBe(false);
    });
  });

  describe('getCSSVariable and setCSSVariable', () => {
    it('should get and set a CSS variable on the document', () => {
      setCSSVariable('--my-var', '42px');
      const value = getCSSVariable('--my-var');
      expect(value.trim()).toBe('42px');
    });
    it('should get and set a CSS variable on an element', () => {
      const el = document.createElement('div');
      document.body.append(el);

      setCSSVariable('--my-var', '42px', el);
      const value = getCSSVariable('--my-var', el);
      expect(value.trim()).toBe('42px');

      el.remove();
    });
  });

  it('noOp should do nothing', () => {
    expect(noOp()).toBeUndefined();
  });
});
