import { clamp } from 'lodash-es';
import { P, match } from 'ts-pattern';

interface ClampParams {
  max?: number;
  min?: number;
}

export class Duration {
  static fromMillis = (millis: number) => new Duration({ millis });
  static randomMillis(clampParams?: ClampParams): Duration {
    const millis = this.generateRandomWithinClamp(clampParams, 0, 10_000); // default 0–10,000ms
    return new Duration({ millis });
  }

  static randomSeconds(clampParams?: ClampParams): Duration {
    const seconds = this.generateRandomWithinClamp(clampParams, 0, 100); // default 0–100s
    return new Duration({ millis: seconds * 1000 });
  }

  get inMillis(): number {
    return this._ms;
  }

  get inSeconds(): number {
    return this._ms / 1000;
  }

  add(other: Duration, clampParams?: ClampParams): Duration {
    const millis = Duration.handleClamp(this._ms + other._ms, clampParams);

    return new Duration({ millis });
  }

  subtract(other: Duration, clampParams?: ClampParams): Duration {
    const millis = Duration.handleClamp(this._ms - other._ms, clampParams);

    return new Duration({ millis });
  }

  multiply(factor: number, clampParams?: ClampParams): Duration {
    const millis = Duration.handleClamp(this._ms * factor, clampParams);

    return new Duration({ millis });
  }

  divide(divisor: number, clampParams?: ClampParams): Duration {
    const millis = Duration.handleClamp(this._ms / divisor, clampParams);

    return new Duration({ millis });
  }

  toString(): string {
    return String(this._ms);
  }

  constructor({
    millis = 0,
    seconds = 0,
  }: {
    millis?: number;
    seconds?: number;
  }) {
    const ms = seconds * 1000;

    this._ms = __E2E__ ? 0 : ms + millis;
  }

  private static handleClamp = (
    num: number,
    clampParams?: ClampParams
  ): number => {
    if (__E2E__) return 0;

    return match(clampParams)
      .with(undefined, () => num)
      .with({ max: P.number, min: P.number }, ({ max, min }) =>
        clamp(num, min, max)
      )
      .with({ min: P.number }, ({ min }) => clamp(num, min, num))
      .with({ max: P.number }, ({ max }) => clamp(num, max))
      .otherwise(() => num);
  };

  private static generateRandomWithinClamp(
    clampParams: ClampParams | undefined,
    defaultMin: number,
    defaultMax: number
  ): number {
    if (__E2E__) return 0;

    const min = clampParams?.min ?? defaultMin;
    const max = clampParams?.max ?? defaultMax;

    return Math.random() * (max - min) + min;
  }

  private readonly _ms: number;
}
