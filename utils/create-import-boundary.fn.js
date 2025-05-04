import path from 'node:path';

import { DIRECTORIES, ROOT_PATH } from './constants.js';
import { getRestrictedIndexImports } from './get-restricted-import-paths.fn.js';

/**
 * @param {string} dir
 */
const getAlias = (dir) => `@/${dir}`;

/**
 * @param {string} dir
 */
export function createImportBoundary(dir) {
  const alias = getAlias(dir);
  const glob = `src/${dir}/**/*.{ts,tsx}`;

  const forbid = DIRECTORIES.flatMap((_dir) =>
    _dir === dir ? undefined : [`${getAlias(_dir)}/**/*`, `${getAlias(_dir)}/*`]
  ).filter(Boolean);

  const absoluteDir = path.resolve(ROOT_PATH, 'src', dir);

  const restrictedIndexPaths = getRestrictedIndexImports(absoluteDir, alias);

  return {
    files: [glob],
    rules: {
      'import/no-internal-modules': [
        'error',
        {
          forbid,
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            ...restrictedIndexPaths,
            {
              message: `Avoid importing '${alias}' from within ${dir}/. Use direct file paths.`,
              name: alias,
            },
          ],
          patterns: [
            {
              group: ['**/index', '**/index.ts', '**/index.tsx'],
              message: `Avoid importing index files directly. Import specific files instead.`,
            },
            {
              group: ['../../**/*'],
              message: `Avoid relative imports outside of this module. Use alias paths instead.`,
            },
          ],
        },
      ],
    },
  };
}
