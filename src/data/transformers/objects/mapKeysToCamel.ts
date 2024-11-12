import { type CamelCasedPropertiesDeep } from 'type-fest';

import { toCamel } from '../strings/toCamel';

import { type MapKeysArg, deepMapKeys } from './deepMapKeys';

export const mapKeysToCamel = <T>(obj: T): CamelCasedPropertiesDeep<T> =>
  deepMapKeys(obj as MapKeysArg, toCamel) as CamelCasedPropertiesDeep<T>;
