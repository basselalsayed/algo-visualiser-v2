import { flow } from 'lodash-es';
import {
  type CamelCasedPropertiesDeep,
  type Simplify,
  type SnakeCasedPropertiesDeep,
} from 'type-fest';

import {
  type NullToUndefined,
  type UndefinedToNull,
  nullToUndefined,
  undefinedToNull,
} from '../nullToUndefined';
import { mapKeysToCamel } from '../objects/mapKeysToCamel';
import { mapKeysToSnake } from '../objects/mapKeysToSnake';

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
