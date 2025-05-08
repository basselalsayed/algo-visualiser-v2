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
} from '../null-to-undefined.fn';
import { mapKeysToCamel } from '../objects/map-keys-to-camel.fn';
import { mapKeysToSnake } from '../objects/map-keys-to-snake.fn';

export const transformParams: <T>(
  arg: T
) => Simplify<
  UndefinedToNull<SnakeCasedPropertiesDeep<T, { splitOnNumbers: true }>>
> = flow([undefinedToNull, mapKeysToSnake]);

export const transformDTO: <T>(
  arg: T
) => Simplify<NullToUndefined<CamelCasedPropertiesDeep<T>>> = flow([
  nullToUndefined,
  mapKeysToCamel,
]);
