import { clamp } from 'lodash-es';
import { P, match } from 'ts-pattern';

interface ClampParams {
  max?: number;
  min?: number;
}

export class Duration {
  static fromMillis = (millis: number) => new Duration({ millis });

  private static handleClamp = (num: number, clampParams?: ClampParams) =>
    match(clampParams)
      .with(undefined, () => num)
      .with({ max: P.number, min: P.number }, ({ max, min }) =>
        clamp(num, min, max)
      )
      .with({ min: P.number }, ({ min }) => clamp(num, min, num))
      .with({ max: P.number }, ({ max }) => clamp(num, num, max))
      .otherwise(() => num);

  private readonly _ms: number;

  constructor({
    millis = 0,
    seconds = 0,
  }: {
    millis?: number;
    seconds?: number;
  }) {
    this._ms = seconds * 1000 + millis;
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
}
