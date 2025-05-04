import fs from 'node:fs';
import path from 'node:path';

const __dirname = new URL('.', import.meta.url).pathname;

/**
 * Recursively walks through a directory and collects relative paths to all index.ts or index.tsx files.
 *
 * @param {string} dir - Absolute path to start walking from.
 * @param {string} baseRelativePath - Relative path from the module root (used for nested structure).
 * @returns {string[]} - List of relative paths to directories containing index files.
 */
function findIndexFileDirs(dir, baseRelativePath = '') {
  const indexDirs = [];
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const relPath = path.join(baseRelativePath, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      indexDirs.push(...findIndexFileDirs(fullPath, relPath));
    } else if (
      (entry === 'index.ts' || entry === 'index.tsx') &&
      baseRelativePath !== ''
    ) {
      indexDirs.push(baseRelativePath);
    }
  }

  return indexDirs;
}

/**
 * Generates a list of restricted import paths for all index.ts(x) files in a module.
 *
 * @param {string} dirAbsolutePath - Absolute path to the module directory (e.g. src/components)
 * @param {string} alias - Import alias for the module (e.g. @/components)
 * @returns {Array<{ name: string, message: string }>}
 */
function getRestrictedIndexImports(dirAbsolutePath, alias) {
  const indexDirs = findIndexFileDirs(dirAbsolutePath);

  const staticUpwardPaths = [
    '../../../index',
    '../../..',
    '../../index',
    '../..',
    '../index',
    '..',
  ].map((name) => ({
    message: `Avoid importing '${name}'. Use aliased or direct file paths.`,
    name,
  }));

  const indexPathViolations = indexDirs.flatMap((relPath) => [
    {
      message: `Avoid importing index file: ${alias}/${relPath}/index.ts. Import specific files instead.`,
      name: `${alias}/${relPath}`,
    },
    {
      message: `Avoid importing index file: ../${relPath}/index.ts. Import specific files instead.`,
      name: `../${relPath}`,
    },
  ]);

  return [...staticUpwardPaths, ...indexPathViolations];
}

export { __dirname, getRestrictedIndexImports };
