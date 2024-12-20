import { type CamelCasedPropertiesDeep } from 'type-fest';

import { toCamel } from '../strings/to-camel.fn';

import { type MapKeysArg, deepMapKeys } from './deep-map-keys.fn';

export const mapKeysToCamel = <T>(obj: T): CamelCasedPropertiesDeep<T> =>
  deepMapKeys(obj as MapKeysArg, toCamel) as CamelCasedPropertiesDeep<T>;
