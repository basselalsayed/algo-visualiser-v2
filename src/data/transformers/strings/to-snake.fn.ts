import { snakeCase } from 'lodash-es';
import { type SnakeCase } from 'type-fest';

export const toSnake = <S extends string>(string: S): SnakeCase<S> =>
  snakeCase(string) as SnakeCase<S>;
