/**
 * Asset path prefix for GitHub Pages subpath deployment.
 * In production, the site is hosted at /Salus_Initiative/,
 * so all public asset paths need this prefix.
 */
const isProd = process.env.NODE_ENV === 'production';
export const BASE_PATH = isProd ? '/Salus_Initiative' : '';

/**
 * Prepend the basePath to a public asset path.
 * Usage: assetPath('/Logo.png') => '/Salus_Initiative/Logo.png' in prod
 */
export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
