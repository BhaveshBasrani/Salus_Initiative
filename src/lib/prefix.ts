/**
 * Asset path prefix for GitHub Pages subpath deployment.
 * In production, the site is hosted at /Salus_Initiative/,
 * so public static assets need this prefix when referenced directly.
 */
const isProd = process.env.NODE_ENV === 'production';
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? '/Salus_Initiative' : '');

/**
 * Prepend the basePath to a public asset path if not already present.
 * Usage: assetPath('/Logo.png') => '/Salus_Initiative/Logo.png' in prod
 */
export function assetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (BASE_PATH && cleanPath.startsWith(BASE_PATH)) {
    return cleanPath;
  }
  return `${BASE_PATH}${cleanPath}`;
}

