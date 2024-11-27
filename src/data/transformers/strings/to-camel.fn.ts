import { camelCase } from 'lodash-es';
import { type CamelCase } from 'type-fest';

export const toCamel = <S extends string>(string: S): CamelCase<S> =>
  camelCase(string) as CamelCase<S>;
