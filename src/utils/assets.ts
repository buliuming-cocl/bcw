/**
 * Resolve a file in /public against Vite's configured base path.
 * This keeps images and the logo working when the site is deployed under a
 * sub-path such as /bcw/ on GitHub Pages.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${path.replace(/^\/+/, '')}`
}
