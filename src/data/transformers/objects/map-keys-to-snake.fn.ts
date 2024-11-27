import { type SnakeCasedPropertiesDeep } from 'type-fest';

import { toSnake } from '../strings/to-snake.fn';

import { type MapKeysArg, deepMapKeys } from './deep-map-keys.fn';

export const mapKeysToSnake = <T extends MapKeysArg>(
  obj: T
): SnakeCasedPropertiesDeep<T> =>
  deepMapKeys(obj, toSnake) as SnakeCasedPropertiesDeep<T>;
