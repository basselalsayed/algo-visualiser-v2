import { flow } from 'lodash-es';
import {
  type CamelCasedPropertiesDeep,
  type Simplify,
  type SnakeCasedPropertiesDeep,
} from 'type-fest';

import {
  type NullToUndefined,
  type UndefinedToNull,
  mapKeysToCamel,
  mapKeysToSnake,
  nullToUndefined,
  undefinedToNull,
} from '..';

export const transformParams: <T>(
  arg: T
) => Simplify<UndefinedToNull<SnakeCasedPropertiesDeep<T>>> = flow([
  undefinedToNull,
  mapKeysToSnake,
]);

export const transformDTO: <T>(
  arg: T
) => Simplify<NullToUndefined<CamelCasedPropertiesDeep<T>>> = flow([
  nullToUndefined,
  mapKeysToCamel,
]);
