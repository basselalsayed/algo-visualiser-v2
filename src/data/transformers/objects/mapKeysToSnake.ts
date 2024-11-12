import { type SnakeCasedPropertiesDeep } from 'type-fest';

import { toSnake } from '../strings/toSnake';

import { type MapKeysArg, deepMapKeys } from './deepMapKeys';

export const mapKeysToSnake = <T extends MapKeysArg>(
  obj: T
): SnakeCasedPropertiesDeep<T> =>
  deepMapKeys(obj, toSnake) as SnakeCasedPropertiesDeep<T>;
