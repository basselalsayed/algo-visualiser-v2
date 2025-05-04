import path from 'node:path';

export const DIRECTORIES = [
  'algorithms',
  'components',
  'contexts',
  'data',
  'hooks',
  'lib',
  'store',
];

export const ROOT_PATH = path.resolve(import.meta.dirname, '..');
