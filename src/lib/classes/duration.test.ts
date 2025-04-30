import { describe, expect, it } from 'vitest';

import { Duration } from './duration';

describe('Duration', () => {
  it('should construct from millis and seconds correctly', () => {
    const d1 = new Duration({ millis: 500 });
    expect(d1.inMillis).toBe(500);
    expect(d1.inSeconds).toBe(0.5);

    const d2 = new Duration({ seconds: 2 });
    expect(d2.inMillis).toBe(2000);

    const d3 = new Duration({ millis: 250, seconds: 1 });
    expect(d3.inMillis).toBe(1250);
    expect(d3.inSeconds).toBe(1.25);
  });

  it('should convert to seconds correctly', () => {
    const d = new Duration({ millis: 1500 });
    expect(d.inSeconds).toBe(1.5);
  });

  it('should add durations correctly', () => {
    const d1 = new Duration({ millis: 300 });
    const d2 = new Duration({ millis: 500 });

    const result = d1.add(d2);
    expect(result.inMillis).toBe(800);
  });

  it('should subtract durations correctly', () => {
    const d1 = new Duration({ millis: 700 });
    const d2 = new Duration({ millis: 300 });

    const result = d1.subtract(d2);
    expect(result.inMillis).toBe(400);
  });

  it('should multiply correctly without clamp', () => {
    const d = new Duration({ millis: 200 });
    const result = d.multiply(2.5);
    expect(result.inMillis).toBe(500);
  });

  it('should divide correctly without clamp', () => {
    const d = new Duration({ millis: 400 });
    const result = d.divide(2);
    expect(result.inMillis).toBe(200);
  });

  it('should clamp when adding', () => {
    const d1 = new Duration({ millis: 600 });
    const d2 = new Duration({ millis: 500 });

    const result = d1.add(d2, { max: 1000 });
    expect(result.inMillis).toBe(1000);
  });

  it('should clamp when subtracting', () => {
    const d1 = new Duration({ millis: 500 });
    const d2 = new Duration({ millis: 300 });

    const result = d2.subtract(d1, { min: 0 });
    expect(result.inMillis).toBe(0);
  });

  it('should clamp when multiplying', () => {
    const d = new Duration({ millis: 300 });
    const result = d.multiply(5, { max: 1000 });
    expect(result.inMillis).toBe(1000);
  });

  it('should clamp when dividing', () => {
    const d = new Duration({ millis: 900 });
    const result = d.divide(0.5, { max: 1000 });
    expect(result.inMillis).toBe(1000);
  });

  it('should return string representation', () => {
    const d = new Duration({ millis: 750 });
    expect(d.toString()).toBe('750');
  });

  it('should support static fromMillis', () => {
    const d = Duration.fromMillis(420);
    expect(d.inMillis).toBe(420);
  });
});
