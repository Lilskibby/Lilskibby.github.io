// Single source of truth for the site's three "pages", which are really
// just URL-addressable states of one continuous animated single-page app.
export const ROUTES = [
  { path: '/', key: 'professional', label: 'Professional' },
  { path: '/music', key: 'music', label: 'Music' },
  { path: '/adventure', key: 'adventure', label: 'Adventure' },
]

// Left-to-right display order in the nav banner. Kept separate from
// ROUTES (which stays URL-oriented) so Professional can sit in the
// center of the banner while its URL is still "/".
export const NAV_ORDER = ['music', 'professional', 'adventure']

export function normalizePath(path) {
  if (!path) return '/'
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path
}

export function sectionIndexForPath(path) {
  const normalized = normalizePath(path)
  const idx = ROUTES.findIndex((r) => r.path === normalized)
  return idx === -1 ? 0 : idx
}
